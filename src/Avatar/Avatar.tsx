import { SizeType } from "ui-web/_common/helper";

export type IAvatarProps = {
    type
    size?: SizeType
    alt?: string;
    src:string,
    srcBackup?:string
}

export const Avatar = ({ alt ='img', size='md',src,srcBackup }: IAvatarProps) => {

    return (
        <span className={`avatar avatar-${size} me-2 avatar-rounded`}>
            <img src={src} alt={alt} />
            <a className="badge rounded-full bg-danger avatar-badge">
                <i className="fe fe-plus !text-[0.625rem]"></i>
            </a>
        </span>
    );
}
