import SidebarItem from '../SidebarItem/SidebarItem';
import './Sidebar.css';

const Sidebar = () => {
	
    const SidebarItems = [
        { title: "Shoutouts with Clip", path: "/shoutouts-with-clip" },
        { title: "Shoutouts with Clip", path: "/shoutouts-with-clip" },
        { title: "Shoutouts with Clip", path: "/shoutouts-with-clip" },
        { title: "Shoutouts with Clip", path: "/shoutouts-with-clip" },
        { title: "Shoutouts with Clip", path: "/shoutouts-with-clip" },
    ]
    
    return (
		<div className="sidebar-container">
			{
                SidebarItems.map((item) => (
                    <SidebarItem title={item.title}/>
                ))
            }
		</div>
	);
};

export default Sidebar;
