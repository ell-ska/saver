'use client'

import { forwardRef, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, XCircle } from 'lucide-react'

import { getImageDimensions } from '@/utils/getImageDimensions/client'
import { cn } from '@/utils/classnames'
import { ImageCard } from '@/components/card/ImageCard'

type Image = {
  url: string
  width: number
  height: number
  alt: string
}

type Props = {
  value?: File
  disabled?: boolean
  onChange?: (file?: File) => void
  className?: string
}

export const Dropzone = forwardRef<HTMLInputElement, Props>(
  ({ value, disabled, onChange, className }, ref) => {
    const [image, setImage] = useState<Image | undefined>(undefined)

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
      accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
      multiple: false,
      disabled,
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (file) {
          void onChange?.(file)
        }
      },
    })

    useEffect(() => {
      if (!value || !acceptedFiles[0]) return

      const getImage = async () => {
        const url = URL.createObjectURL(value)
        const { width, height } = await getImageDimensions(url)
        setImage({ url, width, height, alt: acceptedFiles[0].name })
      }
      getImage()
    }, [value, acceptedFiles])

    return (
      <div
        {...getRootProps({
          className: cn('relative', className),
        })}
      >
        <input ref={ref} {...getInputProps()} />
        {image ? (
          <ImageCard
            src={image.url}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className={cn(!disabled && 'cursor-pointer')}
          />
        ) : (
          <div className='flex cursor-pointer flex-col items-center gap-1 rounded-lg bg-slate-100 px-4 py-8 transition hover:bg-slate-200'>
            <UploadCloud />
            <span>
              <span className='hidden md:inline'>drop image or </span>click here
              to upload
            </span>
          </div>
        )}
        {image && !disabled && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setImage(undefined)
              void onChange?.(undefined)
            }}
            className='absolute -right-2 -top-2 transition hover:scale-110'
          >
            <XCircle className='path-white fill-slate-800' />
          </button>
        )}
      </div>
    )
  },
)
Dropzone.displayName = 'Dropzone'
