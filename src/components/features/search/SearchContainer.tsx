import { Button } from "@/components/shared/button";
import { LargeScreenPresenter } from "./components/LargeScreenPresenter";
import { SmallScreenPresenter } from "./components/SmallScreenPresenter";
import { useSearch } from "@/contexts/search-context";
import { SearchIcon } from "lucide-react";
import { Activity } from "react";
import { useMobile } from "@/hooks/use-mobile";

function SearchContainer() {
    const { setIsOpen } = useSearch()
    const isMobile = useMobile()
    return (
        <>
            <Button variant="quiet" onPress={() => setIsOpen(true)}>
                <span className="flex flex-row items-center justify-start gap-x-2">
                    <SearchIcon className="size-5" />
                    <span className="hidden md:block">
                        Search our Menu
                    </span>
                </span>
            </Button>
            <Activity mode={isMobile ? "visible" : "hidden"}>
                <SmallScreenPresenter />
            </Activity>
            <Activity mode={!isMobile ? "visible" : "hidden"}>
                <LargeScreenPresenter />
            </Activity>
        </>
    );
}

export default SearchContainer;