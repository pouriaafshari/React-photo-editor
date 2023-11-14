import react from 'react';

function SidebarItem({ name, active, handleClick, premium }) {
  return (
     <button className={`sidebar-item ${active?'active':''} ${premium?'premium-item':''}`} onClick={handleClick} disabled={premium}>
        {name}
     </button>
  );
}

export default SidebarItem;
