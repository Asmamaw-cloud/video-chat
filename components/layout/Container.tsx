const Container = ({children}: {children: React.ReactNode}) => {
    return ( 
        <div className="max-w-[1920px] w-full mx-auto xl:p-2 px-4 py-4">
            {children}
        </div>
     );
}
 
export default Container;