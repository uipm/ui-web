export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export type  SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'; 
export type AvatarType = 'rounded' | 'none' | 'border'