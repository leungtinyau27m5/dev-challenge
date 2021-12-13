import "../progress.scss";

const LinearProgress = (props: LinearProgressProps) => {
  return (
    <div className="progress-bar linear-progress-bar">
      <div className="linear-progress-thumb">
        <div className="linear-progress-value"></div>
      </div>
    </div>
  );
};

export interface LinearProgressProps {}

export default LinearProgress;
