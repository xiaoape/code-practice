// 图片格式展示
import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import url from '@/config/config'

const baseUrl = `${url.assetsUrl}`

const BaseIcon = (props) => {
  const {
    name,
    version = '0.2.3',
    trigger,
    width = 48,
    height = 38,
    sx,
    active = false,
    onClick,
  } = props

  const icon = `${baseUrl}${version}/${name}.svg`
  const iconLight = `${baseUrl}${version}/${name}_active.svg`
  const [light, setLight] = useState(active || false)

  let event = {}

  switch (trigger) {
    case 'hover':
      event.onMouseOver = () => {
        setLight(true)
      }
      event.onMouseOut = () => {
        setLight(false)
      }
      break

    case 'click':
      event.onClick = () => {
        setLight(!active)
      }
      break

    default:
      break
  }

  useEffect(() => {
    if (active !== undefined) {
      setLight(active)
    }
  }, [active])

  return (
    <Box
      sx={{ display: 'inline-block', lineHeight: 0, ...sx }}
      onClick={onClick}
      {...event}
    >
      <img
        style={{ display: !light ? 'block' : 'none' }}
        src={icon} width={width} height={height} alt={name}
      />

      {trigger && (
        <img
          style={{ display: light ? 'block' : 'none' }}
          src={iconLight} width={width} height={height} alt={name}
        />
      )}
    </Box>
  )
}

const BasePngIcon = (props) => {
  const {
    name,
    version = '0.3.1',
    px = 3,
    trigger,
    width = 20,
    height = 20,
    sx,
    active = false,
    onClick,
    allName = false,
    normalName,
    activeName,
  } = props

  let icon, iconLight

  if (px && !allName) {
    icon = `${baseUrl}${version}/${name}@${px}x.png`
    iconLight = `${baseUrl}${version}/${name}_active@${px}x.png`
  } else {
    icon = `${baseUrl}${version}/${name}.png`
  }

  if (allName) {
    icon = `${baseUrl}${version}/${normalName}.png`
    iconLight = `${baseUrl}${version}/${activeName}.png`
  }

  const [light, setLight] = useState(active || false)

  let event = {}

  switch (trigger) {
    case 'hover':
      event.onMouseOver = () => {
        setLight(true)
      }
      event.onMouseOut = () => {
        setLight(false)
      }
      break

    case 'click':
      event.onClick = () => {
        setLight(!active)

        !!onClick && onClick()
      }
      break

    default:
      break
  }

  useEffect(() => {
    if (active !== undefined) {
      setLight(active)
    }
  }, [active])

  return (
    <Box
      sx={{ display: 'inline-block', lineHeight: 0, ...sx }}
      onClick={onClick}
      {...event}
    >
      <img
        style={{ display: !light ? 'block' : 'none' }}
        src={icon} width={width} height={height} alt={name}
      />

      {trigger && (
        <img
          style={{ display: light ? 'block' : 'none' }}
          src={iconLight} width={width} height={height} alt={name}
        />
      )}
    </Box>
  )
}

export const EthIcon = props => <BaseIcon name="eth" {...props}/>
export const AddIcon = props => <BasePngIcon name="add_active" {...props} />

export const EditIcon = props => <BasePngIcon px={0} width={30} height={30} name="pencil" version="0.2.3" {...props} />

export const HoverTwitter = props => <BasePngIcon allName={true} normalName="twitter_normal@2x" activeName="twitter_active@2x" trigger="hover" width={36} height={36} {...props} />
export const HoverDiscord = props => <BasePngIcon allName={true} normalName="discord_normal@2x" activeName="discord_active@2x" trigger="hover" width={36} height={36} {...props} />

export const CheckLightIcon = props => <BaseIcon name="check_light" version="0.3.2" width={16} height={16} {...props} />
export const CheckIcon = props => <BaseIcon name="check" version="0.3.2" width={14} height={14} {...props} />

export default BaseIcon
