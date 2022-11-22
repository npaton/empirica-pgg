import { createPopper } from "@popperjs/core";
import React from "react";
import { createPortal } from "react-dom";

export class Highlighter extends React.Component {
  state = { rect: null };

  constructor(props) {
    super(props);
    this.rectEl = React.createRef();
  }

  componentDidMount() {
    if (this.rectEl.current) {
      this.setState({ rect: this.rectEl.current.getBoundingClientRect() });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.rectEl.current) {
      if (this.resizeObserver) {
        return;
      }

      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          this.setState({ rect: entry.target.getBoundingClientRect() });
        }
      });

      const current = this.rectEl.current;
      const child = current.children.item(0);
      this.resizeObserver.observe(child);
    } else {
      this.resizeObserver?.disconnect();
    }
  }

  componentWillUnmount() {
    this.resizeObserver?.disconnect();
  }

  render() {
    const {
      children,
      name,
      highlight = false,
      pad = false,
      disable = false,
    } = this.props;
    const { rect } = this.state;

    if (!highlight) {
      return children;
    }

    const shouldHighlight = highlight.step && highlight.step.component === name;
    const shouldHide = !shouldHighlight && Boolean(highlight.step);

    return (
      <div
        className={`"${shouldHighlight ? "z-10" : ""} ${
          disable ? "pointer-events-none" : ""
        } contents h-full w-full"`}
        ref={this.rectEl}
      >
        {children}
        {rect && (shouldHide || shouldHighlight)
          ? createPortal(
              <HighlighterBox
                rect={rect}
                highlight={highlight}
                name={name}
                pad={pad}
              />,
              document.querySelector("#modal-root")
            )
          : null}
      </div>
    );
  }
}

class HighlighterBox extends React.Component {
  constructor(props) {
    super(props);

    this.box = React.createRef();
    this.tooltip = React.createRef();
  }

  componentDidMount() {
    this.updateTooltip();
  }

  componentDidUpdate(prevProps) {
    this.updateTooltip();
  }

  updateTooltip() {
    const { rect } = this.props;

    if (this.popper) {
      return;
    }

    if (this.box.current && this.tooltip.current && rect.left !== 0) {
      this.popper = createPopper(this.box.current, this.tooltip.current, {
        strategy: "fixed",
        placement: "auto",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ],
      });

      this.tooltip.current.setAttribute("data-show", "");
      this.popper.update();
    } else if (this.popper) {
      this.popper?.destroy();
      this.popper = null;
    }
  }

  componentWillUnmount() {
    this.popper?.destroy();
    this.popper = null;
    console.log("destyroy2");
  }

  render() {
    const { rect, highlight, name, pad } = this.props;

    const shouldHighlight = highlight.step && highlight.step.component === name;
    const shouldHide = !shouldHighlight && Boolean(highlight.step);

    let style = {
      height: rect.height,
      width: rect.width,
      left: rect.left,
      top: rect.top,
    };

    let className = "fixed";

    if (pad) {
      style = {
        height: rect.height + 40,
        width: rect.width + 40,
        left: Math.max(rect.left - 20, 0),
        top: Math.max(rect.top - 20, 0),
      };
    }

    if (shouldHighlight) {
      className +=
        " pointer-events-none z-30 bg-transparent border-4 border-orange-500 rounded-lg shadow-lg";

      if (highlight.step.component) {
        let cn = "";
        switch (highlight.step.direction) {
          case "bottom":
            cn = "top-full mt-3 max-h-min w-full";
            break;
          case "top":
            cn = "bottom-full mb-3 max-h-min w-full";
            break;
          case "right":
            cn = "left-full ml-3 max-w-min max-h-prose flex-col";
            break;
        }
      }
    } else if (shouldHide) {
      className += " z-20 bg-white/70";
    }

    return (
      <>
        <div ref={this.box} style={style} className={className} />
        {shouldHighlight && highlight.step?.content && (
          <div id="tooltip" ref={this.tooltip}>
            <div className=" bg-white rounded-lg shadow-lg border-8 border-orange-500 p-12 min-w-96 w-auto max-w-prose pointer-events-auto">
              <div className="prose prose-slate prose-p:text-gray-500 prose-p:font-['Inter'] prose-headings:text-orange-600 overflow-auto">
                {highlight.step.content}
              </div>
              <div>
                {!highlight.step.nonext && (
                  <button
                    className="bg-orange-500 text-white rounded-lg px-4 py-2 mt-4"
                    onClick={() => {
                      highlight.next();
                    }}
                  >
                    {highlight.step.nextText || "Next"}
                  </button>
                )}
              </div>
            </div>
            <div id="arrow" data-popper-arrow></div>
          </div>
        )}
      </>
    );
  }
}
