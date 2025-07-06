import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default async function Page({params,}: {params: Promise<{ id: string }>}) {
  const { id } = await params
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Driver {id}</CardTitle>
          <CardDescription>
            Driver Details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="text">Full Name</Label>
                <Input
                  id="Model"
                  type="text"
                  placeholder="Jay Hamed"
                />
              </div>
              
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="text">Phone Number</Label>
                </div>
                <Input id="phoneNumber" type="number" placeholder="057221322" />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="text">Vendor</Label>
                </div>
                <Input id="vendorName" type="text" placeholder="H&B Express" />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Edit
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}






