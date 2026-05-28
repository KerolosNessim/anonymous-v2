import React from 'react'
import { cn } from '@/lib/utils'
import * as motion from "motion/react-client"
interface SectionHeaderProps {
  label: string;
  title: string;
  description: string;
  align?: 'start' | 'center' | 'end';
  withAnimation?: boolean;
  descriptionClassName?: string;
}
export default function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  withAnimation = true,
  descriptionClassName = '',
}: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-2 overflow-hidden',
      align === 'start' ? 'items-start' : align === 'center' ? 'items-center' : 'items-end')}>
      <motion.span
      initial={withAnimation ? {
        opacity: 0,
        y: 20,
      } : undefined}
      whileInView={withAnimation ? {
        opacity: 1,
        y: 0,
        } : undefined}
        viewport={withAnimation ? { once: true } : undefined}
        transition={{
          duration: 0.5,
        }}
        className='text-custom-primary text-sm font-bold'>{label}</motion.span>
      <motion.h2
      initial={withAnimation ? {
        opacity: 0,
        y: 20,
      } : undefined}
      whileInView={withAnimation ? {
        opacity: 1,
        y: 0,
      } : undefined}
        viewport={withAnimation ? { once: true } : undefined}
      transition={{
        duration: 0.5,
        delay: 0.5,
      }}
        className='lg:text-4xl text-2xl font-bold'>{title}</motion.h2>
      <motion.p
        initial={withAnimation ? {
          opacity: 0,
          y: 20,
        } : undefined}
        whileInView={withAnimation ? {
          opacity: 1,
          y: 0,
        } : undefined}
        viewport={withAnimation ? { once: true } : undefined}
        transition={{
          duration: 0.5,
          delay: 0.7,
        }}
        className={cn('text-gray-400 leading-loose', 
          align === 'start' ? 'text-left' :
            align === 'center' ? 'text-center' :
              'text-right',
          descriptionClassName
        )}
      >
        {description}
      </motion.p>
    </div>
  )
}