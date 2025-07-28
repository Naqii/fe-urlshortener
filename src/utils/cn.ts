import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
/**
 * clsx berfungsi untuk menggabungkan banyak clas dalam satu string,
 * secara kondisional dan bersih.
 * contoh tanpa clsx
 * const isActive = true;
 * const clasName = isActive ? "text-blue-500" : "text-gray-500"
 * 
 * contoh dengan clsx
 * const className = `p-4 ${isActive ? "bg-blue-500" : "bg-gray-500"} ${isError ? "border-red-500" : ""}`;
 * (lebih ringkas)
 * sedangkan tailwind-merge digunakan untuk menghapus class Tailwind yang saling bertabrakan,
 * dan mengambil yang terakhir/logis.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}