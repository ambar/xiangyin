import * as ui from '@chakra-ui/react'
import React from 'react'
import * as hi from 'react-icons/hi'

export const StyledPopover: React.FC<
  ui.PopoverProps & {
    triggerContent?: React.ReactNode
    header: React.ReactNode
    children: React.ReactNode
  }
> = ({triggerContent, header, children, ...props}) => {
  return (
    <ui.Popover isLazy trigger="hover" placement="bottom" {...props}>
      {triggerContent && (
        <ui.PopoverTrigger>{triggerContent}</ui.PopoverTrigger>
      )}
      <ui.Portal>
        <ui.PopoverContent maxHeight="30vh" overflowY="auto">
          {header && (
            <ui.PopoverHeader fontWeight="semibold">{header}</ui.PopoverHeader>
          )}
          <ui.PopoverArrow />
          <ui.PopoverCloseButton top="2" />
          <ui.PopoverBody>{children}</ui.PopoverBody>
        </ui.PopoverContent>
      </ui.Portal>
    </ui.Popover>
  )
}

// 大多图标库里只有 up/down 两样式，但我更需要的中等的（两条线），FiVolume2/BsVolumeUp
// https://react-icons.github.io/react-icons/search?q=volume
export const VolumeIcon = hi.HiVolumeUp
export const VolumeOffIcon = hi.HiVolumeOff
