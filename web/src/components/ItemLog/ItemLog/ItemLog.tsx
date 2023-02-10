type ItemLogProps = {
  timestamp: string
  logContent: string
  onDelete?: () => void
}

const ItemLog = (props: ItemLogProps) => {
  return (
    <div className="flex w-52 flex-col items-start justify-start gap-4 rounded bg-slate-100 px-4 py-4 text-slate-900 sm:w-80">
      <div className="text-base">{props.logContent}</div>
      <div className="flex w-full flex-row items-end justify-between">
        <div className="text-xs tracking-wide text-slate-400">
          {humanizeTimestamp(props.timestamp)}
        </div>
        <button
          type="button"
          onClick={props.onDelete}
          className="text-xs text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ItemLog

// Use Intl to format timestamp to be more human readable
function humanizeTimestamp(timestamp: string) {
  return Intl.DateTimeFormat('en-SG', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp))
}
