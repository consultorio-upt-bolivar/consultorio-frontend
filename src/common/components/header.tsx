export const Header = () => {
    return <nav>
        <div className="nav-wrapper">
            <button className="brand-logo">Logo</button>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><button >Sass</button></li>
                <li><button>Components</button></li>
                <li><button >JavaScript</button></li>
            </ul>
        </div>
    </nav>
}