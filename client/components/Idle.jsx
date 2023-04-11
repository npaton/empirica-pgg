import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";
import React from "react";
import { dev } from "../../dev";
import { Button } from "./FunButton";

function playerLeft(player) {
  player.log("idleExit", {
    verb: "idleExit",
    playerId: player._id,
    timestamp: moment(TimeSync.serverTime(null, 1000)),
  });

  player.set("exited", true);
  player.exit("idleTimedOut");
}

const warningTime = dev ? 50000 : 15;
const idleTimeDifferentTab = dev ? 50000 : 20;

export default class IdleToast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingTime: warningTime,
      idle: false,
      delayStarted: false,
      delayID: "",
      clockID: "",
      lastActive: "",
    };
  }

  beginCountDown(stage) {
    const lastActivity = this.state.lastActive;

    if (
      typeof lastActivity !== "string" &&
      lastActivity + (warningTime + idleTimeDifferentTab) * 1000 <
        Date.parse(stage.startTimeAt) + stage.durationInSeconds * 1000
    ) {
      return (
        <div className="z-40 h-screen w-screen fixed top-0 left-0 bg-white/80 p-20 flex justify-center">
          <div className="relative bg-white rounded-lg shadow-lg border-8 border-orange-200 p-12 h-auto overflow-auto">
            <div className="prose max-w-none prose-slate prose-p:text-gray-500 prose-p:font-['Inter'] prose-headings:text-orange-600">
              <p style={{ fontSize: "15px" }}>
                You are idle. Please indicate your presence by returning to this
                screen, clicking the button, and maintaining mouse and keyboard
                activity. You will be logged out in {this.state.remainingTime}{" "}
                seconds.
              </p>
              <br />
              <br />
              <center>
                <Button onClick={this.changeIdleFalse}>I'm Active</Button>
              </center>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  decrTime = () => {
    const { player } = this.props;
    if (!(this.state.remainingTime <= 0)) {
      this.setState({ remainingTime: this.state.remainingTime - 1 });
    } else {
      playerLeft(player);
    }
  };

  changeIdleTrueDelay = () => {
    const { player } = this.props;
    if (!this.state.delayStarted && !this.state.idle) {
      player.log("idleStart", {
        verb: "idleStart",
        playerId: player._id,
        timestamp: moment(TimeSync.serverTime(null, 1000)),
      });

      this.setState({
        delayStarted: true,
        delayID: setTimeout(() => {
          this.setState({
            idle: true,
            clockID: setInterval(this.decrTime, 1000),
          });
          this.stopDelay();
        }, idleTimeDifferentTab * 1000),
        lastActive: new Date().getTime(),
      });
    }
  };

  stopDelay = () => {
    if (this.state.delayStarted) {
      clearTimeout(this.state.delayID);
      this.setState({
        delayStarted: false,
        delayID: "",
      });
    }
  };

  changeIdleFalse = () => {
    const { player } = this.props;
    player.log("idleEnd", {
      verb: "idleEnd",
      playerId: player._id,
      timestamp: moment(TimeSync.serverTime(null, 1000)),
    });

    clearTimeout(this.state.clockID);
    this.setState({
      idle: false,
      remainingTime: warningTime,
      lastActive: new Date().getTime(),
    });
  };

  componentDidUpdate() {
    const { player } = this.props;
    if (player !== undefined) {
      player.idle ? this.changeIdleTrueDelay() : this.stopDelay();
    }
  }

  render() {
    const { stage } = this.props;

    return <div>{this.state.idle ? this.beginCountDown(stage) : null}</div>;
  }
}
