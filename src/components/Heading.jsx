import React, { memo } from 'react'

const Heading = memo(({ classes, HeadingTag, text}) => {
  return (
    <HeadingTag className={classes}>{text}</HeadingTag>
  )
})

export default Heading