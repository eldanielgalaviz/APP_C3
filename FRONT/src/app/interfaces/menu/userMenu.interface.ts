export interface UserMenu {
    Menus: Menu[];
}

export interface Menu {
    menu:       string;
    order:      number;
    submenus:   Submenu[] | null;
    Idmainmenu: number;
}

export interface Submenu {
    order:     number;
    submenu:   string;
    Idsubmenu: number;
}
