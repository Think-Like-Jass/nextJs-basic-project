export default function ProfileLayout({ children }) {
    return (
        <>
            <div className="profile-heading">
                <h1>Profile heading</h1>
                {children}
                <h1>Profile foot</h1>
            </div>
        </>
    );
}