"use client"
import { motion } from "motion/react"
import Image from "next/image"

export const M = {
  div:     motion.div,
  p:       motion.p,
  header:  motion.header,
  nav:     motion.nav,
  section: motion.section,
  main:    motion.main,
  a:       motion.a,
  button:  motion.button,
  span:    motion.span,
  h1:      motion.h1,
  h2:      motion.h2,
  h3:      motion.h3,
  h4: motion.h4,
  li:      motion.li,
  ul:      motion.ul,
  img:  motion.create(Image),
  image: motion.img,

}