type ItemLogProps = {
  timestamp: string
  logContent: string
}

const ItemLog = (props: ItemLogProps) => {
  return (
    <div className="flex w-96 flex-col items-start justify-start gap-4 rounded bg-slate-800 px-4 py-2 text-slate-300">
      <div className="text-base">{props.logContent}</div>
      <div className="text-sm tracking-wide text-gray-500">
        {props.timestamp}
      </div>
    </div>
  )
}

export default ItemLog
