import React, { ComponentProps } from 'react'

export default function Input(props: ComponentProps<'input'>) {
  return (
    <input {...props} className={'p-2 rounded-md bg-slate-800 border border-slate-500 focus-visible:outline-indigo-400 ' + props.className} />
  )
}
