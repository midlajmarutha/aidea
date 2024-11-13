"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useState } from "react"


export const pricingData = [
  {
    price: 199,
    duration: "month",
    priceid:"price_1QGBM8SDgcr0KksvCJmh2sR8",
    paymentlink:"https://buy.stripe.com/test_eVa9Ct3uHbiM9Jm4gg", 
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
  {
    price: 999,
    duration: "year",
    priceid:"price_1QGKp4SDgcr0KksvMJBo0uCf",
    paymentlink:"https://buy.stripe.com/test_cN2eWN7KX2Mgf3G9AB", 
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
];

const Pricing = ({ defaultValue = "monthly" }) => {
  const [isYearly, setIsYearly] = useState(defaultValue === "yearly")

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center gap-6 mb-10">
        <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
        <Tabs defaultValue={defaultValue} onValueChange={(value) => setIsYearly(value === "yearly")}>
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly" />
          <TabsContent value="yearly" />
        </Tabs>
      </div>

      {/* Pricing Card */}
      <div className="flex justify-center">
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>Standard Plan</CardTitle>
            <CardDescription>Perfect for individual users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <span className="text-4xl font-bold">₹{isYearly ? "999" : "99"}</span>
              <span className="text-muted-foreground">/{isYearly ? "year" : "month"}</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li>✓ Feature 1</li>
              <li>✓ Feature 2</li>
              <li>✓ Feature 3</li>
            </ul>
          </CardContent>
          <CardFooter>
            <a href={pricingData[isYearly ? 1 : 0].paymentlink} className="w-full">
              <Button className="w-full">Get Started</Button>
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Pricing
