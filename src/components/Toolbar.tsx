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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path fill="#ffffffde" d="M19 12.998H5v-2h14z" />
            </svg>
          </button>
          <span>100%</span>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path fill="#ffffffde" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
            </svg>
          </button>
        </div>
      </div>
      <div className='right'>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <g fill="none" stroke="#ffffffde" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path stroke-dasharray="32" stroke-dashoffset="32" d="M12 6c3.31 0 6 2.69 6 6c0 3.31 -2.69 6 -6 6c-3.31 0 -6 -2.69 -6 -6v-2.5">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="32;0" />
              </path>
              <path stroke-dasharray="6" stroke-dashoffset="6" d="M6 9l-3 3M6 9l3 3">
                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.2s" values="6;0" />
              </path>
            </g>
          </svg>
        </button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="#ffffffde" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" />
          </svg>
        </button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="#ffffffde" d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2" />
          </svg>
        </button>
      </div>
    </div>
  );
}