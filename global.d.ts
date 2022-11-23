export {}
declare global {
    interface Window {
        initMap: () => void;
		alreadyCallback: (data: AlreadyCheck) => void;
		commitmentCallback: (userEmail: string) => void;
    }
}