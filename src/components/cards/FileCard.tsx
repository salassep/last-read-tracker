import './file-card.css';

export default function FileCard({
  fileUrl, 
  onDelete
}: {
  fileUrl: string, 
  onDelete: (fileUrl: string) => void
}): JSX.Element {

  const filename = (() => {
    const filepathArr = decodeURIComponent(fileUrl).split("/")
    return filepathArr[filepathArr.length - 1];
  })()

  return (
    <div className="file-card">
      <p>{filename}</p>
      <div className="action">
        <button>
          <a href={fileUrl} target="_blank">
            Open
          </a>
        </button>
        <button onClick={() => onDelete(fileUrl)}>
          Delete
        </button>
      </div>
    </div>
  );
}