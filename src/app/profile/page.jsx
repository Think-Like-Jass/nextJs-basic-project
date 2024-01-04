import websiteBuilderSvg from '@/asserts/undraw_website_builder_re_ii6e.svg'
import Image from 'next/image';

async function loadData() {
    return new Promise((resolve) => {
        setTimeout(resolve, 3000);
    });
}

export default async function ProfilePage() {
    await loadData();
    return (
        <div>
            Profile page content
            <Image src={websiteBuilderSvg} />
        </div>
    );
}