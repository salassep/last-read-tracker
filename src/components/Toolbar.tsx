import './toolbar.css';

export default function Toolbar({ activePage }: {activePage: number}): JSX.Element {
  return (
    <div className="toolbar">
      <span>Sample pdf</span>
      <div>
        {activePage} of 3
      </div>
      <div>
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}