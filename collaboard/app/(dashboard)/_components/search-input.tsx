"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import { useRouter } from "next/navigation";
import {
    ChangeEvent,
    useEffect,
    useState,
} from "react";

import { Input } from "@/components/ui/input";


export const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const debounceValue = useDebounceValue<string>(value, 500);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        const query = debounceValue ? { search: debounceValue } : {};
        console.log("debounce = ", debounceValue);
        const url = qs.stringifyUrl({
                url: "/",
                query: debounceValue[0] ? { search: debounceValue[0] } : {},
            },
            { skipEmptyString: true, skipNull: true }
        );
        router.push(url);
    }, [debounceValue, router]);

    return(
        <div className="w-full relative flex items-center">
            <Search
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
            />
            <Input
                className="w-full max-w-129 pl-9"
                placeholder="Search boards..."
                value={value}
                onChange={handleChange}                
            />
        </div>
    );
};
