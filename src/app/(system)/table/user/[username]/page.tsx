import CardList from "@/components/CardList";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { BadgeCheck } from "lucide-react";
import EditUserPage from "@/components/user/editUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppLineChart from "@/components/charts/AppLineChart";


const SingleUserpage = () => {
    return (
        <div className="flex flex-col min-h-[calc(100vh-136px)] rounded-xl border border-dashed p-6 mb-4">
            <div className="mb-6 pb-4 ">
                <h1 className="text-3xl font-bold tracking-tight ">
                    User Profile
                </h1>
            </div>
            <div className="flex-1 w-full h-full">
                <div>
                    {/* change this to a reuseble component too long for each page */}
                    <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/users">
                            Components
                        </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>User 1</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* containter */}
                <div className="mt-4 flex flex-col xl:flex-row gap-8">
            
            {/* left */}
                <div className="w-full xl:w-1/3 space-y-6">
                    {/* user badges */}
                    <div className="bg-primary-foreground p-4 rounded-lg">
                        <h1 className="text-xl font-semibold">User Badges</h1>
                        
                            {/* hover cards badges*/}
                            <div className="flex gap-4 mt-4">
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <BadgeCheck size="36" className="rounded-full bg-blue-500/30 border-1 border-blue-500/50 p-2"/>
                                    </HoverCardTrigger>
                                    <HoverCardContent>
                                       <h1 className="font-bold mb-2">Verified User</h1>
                                       <p className="text-sm text-muted-foreground">This user has been verfied by me</p>
                                    </HoverCardContent>
                                </HoverCard>

                                <HoverCard>
                                    <HoverCardTrigger>
                                        <BadgeCheck size="36" className="rounded-full bg-red-500/30 border-1 border-red-500/50 p-2"/>
                                    </HoverCardTrigger>
                                    <HoverCardContent>
                                       <h1 className="font-bold mb-2">Verified User</h1>
                                       <p className="text-sm text-muted-foreground">This user has been verfied by me</p>
                                    </HoverCardContent>
                                </HoverCard>

                                <HoverCard>
                                    <HoverCardTrigger>
                                        <BadgeCheck size="36" className="rounded-full bg-green-500/30 border-1 border-blue-green/50 p-2"/>
                                    </HoverCardTrigger>
                                    <HoverCardContent>
                                       <h1 className="font-bold mb-2">Verified User</h1>
                                       <p className="text-sm text-muted-foreground">This user has been verfied by me</p>
                                    </HoverCardContent>
                                </HoverCard>

                                <HoverCard>
                                    <HoverCardTrigger>
                                        <BadgeCheck size="36" className="rounded-full bg-orange-500/30 border-1 border-orange-500/50 p-2"/>
                                    </HoverCardTrigger>
                                    <HoverCardContent>
                                       <h1 className="font-bold mb-2">Verified User</h1>
                                       <p className="text-sm text-muted-foreground">This user has been verfied by me</p>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                    </div>

                    {/* info  */}
                    <div className="bg-primary-foreground p-4 rounded-lg">
                        <div className="flex item-center justify-between">
                             <h1 className="text-xl font-semibold">User Information</h1>
                             {/* Sheet Edit form */}
                            <EditUserPage />

                        </div>
                        
                         <div className="space-y-4 mt-4">
                            <div className="flex flex-col gap-2 mb-8">
                                <p className="text-sm text-muted-foreground">Profile Completion</p>
                                <Progress value={66}/>
                            </div>
                            <div className="flex item-center gap-2">
                                <span className="font-bold">Username</span>
                                <span>John.doe</span>
                            </div>
                             <div className="flex item-center gap-2">
                                <span className="font-bold">Email</span>
                                <span>John.doe</span>
                            </div>

                             <div className="flex item-center gap-2">
                                <span className="font-bold">Phone</span>
                                <span>John.doe</span>
                            </div>

                             <div className="flex item-center gap-2">
                                <span className="font-bold">Location</span>
                                <span>John.doe</span>
                            </div>

                             <div className="flex item-center gap-2">
                                <span className="font-bold">Role</span>
                                <Badge>Admin</Badge>
                            </div>
                         </div>
                         <p className="text-sm text-muted-foreground">Joined on 202501.01</p>
                    </div>

                     {/* card list  */}
                    <div className="bg-primary-foreground p-4 rounded-lg">
                        <CardList title="Recent Transaction"></CardList>
                    </div>
                </div>


            {/* right */}
                <div className="w-full xl:w-2/3 space-y-6">
                    {/* user card */}
                     <div className="bg-primary-foreground p-4 rounded-lg space-y-4">
                        <div className="flex items-center gap-2">
                            <Avatar className="size-12">
                                <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
                                  <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            
                            <h1 className="text-xl font-semibold">John Doe</h1>
                           
                        </div>
                         <p className="text-sm text-muted-foreground ">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos tenetur impedit ipsa sunt eveniet vero iste neque consequuntur eaque quod incidunt asperiores at nesciunt unde consequatur aspernatur nulla, fugiat quia.
                                Voluptate magnam eveniet sapiente maxime nemo quae dolor quo sed dolorem voluptatum rerum neque velit, non excepturi fuga veniam mollitia laborum deserunt provident ullam. Maxime veniam iure quia natus iste.
                                Dolor, dicta a sunt officia quidem commodi? Voluptate ipsa temporibus voluptatibus, non enim architecto quo neque. Commodi, quod provident? Iure, dolorum pariatur! Doloribus corporis cupiditate odit sint! Ullam, reprehenderit facere.
                            </p>
                        
                     </div>

                    {/* charts */}
                     <div className="bg-primary-foreground p-4 rounded-lg">
                        <AppLineChart />

                       
                     </div>
                </div>
                </div>
            </div>
        </div>
        </div>
    );
    
};

export default SingleUserpage;