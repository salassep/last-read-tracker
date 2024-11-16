import './toolbar.css';

export default function Toolbar({ 
  activePage,
  totalPages,
  scale,
  fileUrl,
  onRotate,
  onAddScale,
  onSubtractScale,
  onPageChange,
  onSubmitPageChange,
}: {
  activePage: number,
  totalPages: number,
  scale: number,
  fileUrl: string
  onRotate: () => void,
  onAddScale: () => void,
  onSubtractScale: () => void,
  onPageChange: (page: number | null) => void,
  onSubmitPageChange: () => void,
}): JSX.Element {
  const handleDownloadFile = async () => {
    try {
      const response = await fetch(fileUrl)
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.download = "download.pdf";
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error when fetching file:", error)
    }
  }

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onPageChange(value === "" ? null : parseInt(value))
  }

  return (
    <div className='toolbar'>
      <span>Sample pdf</span>
      <div className='center'>
        <div>
          <input
            className="input-page"
            type="number"
            value={activePage ?? ""}
            onChange={handlePageChange}
            onBlur={onSubmitPageChange}
          />
          <span> / {totalPages}</span> 
        </div>
        <span className='vertical-separator'></span>
        <div className='zoom'>
          <button onClick={onSubtractScale}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path fill="#ffffffde" d="M18 12.998H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2" />
            </svg>
          </button>
          <span className='zoom-percentage'>{ Math.round(scale * 100) }%</span>
          <button onClick={onAddScale}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path fill="#ffffffde" d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2" />
            </svg>
          </button>
        </div>
      </div>
      <div className='right'>
        <button onClick={onRotate}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <g fill="none" stroke="#ffffffde" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path strokeDasharray="32" strokeDashoffset="32" d="M12 6c3.31 0 6 2.69 6 6c0 3.31 -2.69 6 -6 6c-3.31 0 -6 -2.69 -6 -6v-2.5">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="32;0" />
              </path>
              <path strokeDasharray="6" strokeDashoffset="6" d="M6 9l-3 3M6 9l3 3">
                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.2s" values="6;0" />
              </path>
            </g>
          </svg>
        </button>
        <button onClick={handleDownloadFile}>
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