import { X } from "lucide-react";

const ActionBanner = ({ type, content, onCancel, icon: Icon }: any) => (
    <div className="flex items-center justify-between bg-surface-900 border-l-4 border-primary-500 p-3 rounded-t-xl animate-in slide-in-from-bottom-2">
        <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-primary-400 uppercase flex items-center gap-1">
                {Icon && <Icon size={10} />} {type}
            </p>
            <p className="text-xs text-surface-400 truncate">{content}</p>
        </div>
        <button onClick={onCancel} className="p-1 text-surface-500 hover:text-white"><X size={16} /></button>
    </div>
);

export default ActionBanner;