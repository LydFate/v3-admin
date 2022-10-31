declare type DeepPartial<T> = {
  [p in keyof T]?: DeepPartial<T[P]>
}

declare type TimeoutHandle = ReturnType<typeof setTimeout>
declare type IntervalHandle = ReturnType<typeof setInterval>
