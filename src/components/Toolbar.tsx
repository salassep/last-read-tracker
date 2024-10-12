import './toolbar.css';

export default function Toolbar({ activePage }: {activePage: number}): JSX.Element {
  return (
    <div className='toolbar'>
      <span>Sample pdf</span>
      <div className='center'>
        <div>
          {activePage} / 3
        </div>
        <span className='vertical-separator'></span>
        <div className='zoom'>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#ffffffde" d="M19 12.998H5v-2h14z" />
            </svg>
          </button>
          <span>100%</span>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#ffffffde" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
            </svg>
          </button>
        </div>
      </div>
      <div>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="#ffffffde" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" />
          </svg>
        </button>
      </div>
    </div>
  );
}