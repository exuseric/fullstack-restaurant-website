import { useNavigation } from "@/contexts/navigation-context";
import { ListBox, ListBoxItem } from "react-aria-components";
import MobileMenuItem from "./MobileMenuItem";

function MobileMenu() {
    const { links } = useNavigation()
    return (
        <nav className="nav flex flex-col gap-y-1 overflow-y-scroll overscroll-y-contain">
            <ListBox items={links} aria-label="Navigation Links">
                {link => (
                    <ListBoxItem textValue={link.title} key={link.id} className="not-last:mb-2">
                        <>
                            <MobileMenuItem link={link} />
                        </>
                    </ListBoxItem>
                )}
            </ListBox>
        </nav>
    );
}

export default MobileMenu;