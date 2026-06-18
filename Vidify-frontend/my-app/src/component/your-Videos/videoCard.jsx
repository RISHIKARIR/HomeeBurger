import {
  Eye,
  Pencil,
  BarChart3,
  Trash2,
} from "lucide-react";

export default function VideoCard({data}) {
  return (
    <div className="w-full rounded-2xl border border-[#2A241E] bg-[#17120E] px-6 py-4">
      <div className="flex items-center justify-between">
      
        <div className="flex items-center gap-5">
          
          <div className="relative h-[72px] w-[110px] overflow-hidden rounded-xl bg-[#26211C]">
            
            <img src="/food.jpg"></img>
            <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-1 text-[11px] font-semibold text-white">
              28 min
            </span>
          </div>

         
          <div>
            <h3 className="text-[22px] font-semibold text-white">
              {data.title}
            </h3>

            <p className="mt-1 text-[15px] text-[#8E8174]">
              {data.description}
            </p>
          </div>
        </div>

   
        <div className="flex items-center gap-2 text-[#8E8174]">
          <Eye size={16} />
          <span className="text-[16px]">12.4K</span>
        </div>

        
        <p className="text-[15px] text-[#8E8174]">
          Jun 12, 2025
        </p>

   
        <div className="rounded-lg bg-[#2B2219] px-5 py-2">
          <span className="font-medium text-[#F59E0B]">
            Published
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#221C17] text-[#8E8174] transition hover:text-white">
            <Pencil size={18} />
          </button>

          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#221C17] text-[#8E8174] transition hover:text-white">
            <BarChart3 size={18} />
          </button>

          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#221C17] text-[#8E8174] transition hover:text-red-400">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}