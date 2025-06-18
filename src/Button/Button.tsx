type IButtonProps = {
  label: string;
  className?: string
  onClick?: (e: any) => void

}

export const Button = ({ label, className, onClick }: IButtonProps) => {

  return (
    <button className={`inline-block py-[10px] px-[30px] bg-purple-500 text-white transition-all hover:bg-purple-400 rounded-md border border-purple-500 hover:border-purple-400 ltr:mr-[11px] rtl:ml-[11px] mb-[15px] ${className}`}
      >
      {label}
    </button>
  );
}
