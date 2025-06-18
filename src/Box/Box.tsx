type IBoxProps = {
    children: React.ReactNode,
    title?: string,
    subtitle?: string,
}
export const Box = ({ children, title, subtitle }: IBoxProps) => (
    <div className="box">
        <div className="box-header justify-between">
            {title && <div className="box-title">
                {title}
                {subtitle && (
                    <p className="subtitle text-textmuted dark:text-textmuted/50 text-xs font-normal">
                        {subtitle}
                    </p>
                )}
            </div>}
            <div className="prism-toggle">
                <button className="ti-btn ti-btn-sm ti-btn-soft-primary">Show Code<i className="ri-code-line ms-2 inline-block align-middle"></i></button>
            </div>
        </div>
    </div>
);