import './toolbar.css';

export default function Toolbar(): JSX.Element {
  return (
    <div className="toolbar">
      <span>Sample pdf</span>
      <div>
        1 of 3
      </div>
      <div>
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}