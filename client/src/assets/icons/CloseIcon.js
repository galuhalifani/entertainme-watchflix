import React from 'react'
import BaseIcon from './BaseIcon'

export const CloseIconSuccess = () => (
  <BaseIcon color='#000000' pushRight={false}>
    <line x1='18' y1='6' x2='6' y2='18' />
    <line x1='6' y1='6' x2='18' y2='18' />
  </BaseIcon>
)

export const CloseIconError = () => (
  <BaseIcon color='#ffffff' pushRight={false}>
    <line x1='18' y1='6' x2='6' y2='18' />
    <line x1='6' y1='6' x2='18' y2='18' />
  </BaseIcon>
)
