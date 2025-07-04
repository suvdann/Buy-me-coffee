import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaymentExpires } from "./Payment-expires";
// import { PaymentYears } from "./Payment-year";
import { Button } from "@/components/ui/button";
import axios from "axios";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
type Props = {
  changeHandler: () => void;
};
const months = [
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];
const countries = [
  { label: "Mongolia", value: "MN" },
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "UK" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
  { label: "Japan", value: "JP" },
  { label: "South Korea", value: "KR" },
  { label: "China", value: "CN" },
  { label: "India", value: "IN" },
  { label: "New Zealand", value: "NZ" },
  { label: "Russia", value: "RU" },
];
const years = [
  { label: "2001" },
  { label: "2021" },
  { label: "2022" },
  { label: "2023" },
  { label: "2024" },
  { label: "2025" },
  { label: "2002" },
  { label: "2003" },
  { label: "2004" },
  { label: "2005" },
];
export const Payment = ({ changeHandler }: Props) => {
  const [open, setOpen] = useState(false);
  const PaymentSchema = z.object({
    expiryDate: z.enum([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ]),
    cardNumber: z.string().min(1, "Invalid card number"),

    country: z.enum([
      "MN",
      "US",
      "UK",
      "CA",
      "AU",
      "DE",
      "FR",
      "JP",
      "KR",
      "CN",
      "IN",
      "NZ",
      "RU",
    ]),

    firstName: z.string().min(1, "Please enter a firstname"),
    lastName: z.string().min(1, "Please enter a lastname"),
    CVC: z.string().min(1, "PLease enter a CVC"),
    years: z.enum([
      "2001",
      "2021",
      "2022",
      "2023",
      "2024",
      "2025",
      "2002",
      "2003",
      "2004",
      "2005",
    ]),
    // lastName: z.string().url("Please enter a social link"),
  });

  const form = useForm<z.infer<typeof PaymentSchema>>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      country: undefined,
      cardNumber: "",
      expiryDate: undefined,
      firstName: "",
      lastName: "",
      years: undefined,
      CVC: "",
    },
  });
  const handleSubmit = async (values: z.infer<typeof PaymentSchema>) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Token not found");
    console.log(values);
    // changeHandler();
    const expiryDate = new Date(
      Number(values.years),
      Number(values.expiryDate) - 1,
      1
    );
    console.log(values, "sdfghjkjhgfdfghj");
    try {
      const res = await axios.post(
        "http://localhost:8000/bankCard",
        {
          country: values.country,
          cardNumber: values.cardNumber,
          expiryDate: expiryDate,
          firstName: values.firstName,
          lastName: values.lastName,

          //   userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   const data = await res.json();
      // if (res.ok) {
      //           changeHandler();
      //         } else {
      //           alert(data.message);
      //         }
      changeHandler();
    } catch (err) {
      console.error("payment error", err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[510px]  flex flex-col gap-1">
        <h1 className="text-[24px] font-bold">
          How would you like to be paid?{" "}
        </h1>
        <p>Enter location and payment details</p>

        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            {/* email */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select country</FormLabel>
                  <FormControl>
                    <select {...field} className="">
                      {countries.map((countries) => (
                        <option key={countries.value} value={countries.value}>
                          {countries.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-1 w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          placeholder=" Enter your name here"
                          className="w-[249px]"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          placeholder="Enter your name here"
                          className="w-[249px]"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter card number</FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        className="w-full"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expires</FormLabel>
                    <FormControl>
                      <select {...field} className="">
                        <option>month</option>
                        {months.map((month) => (
                          <option key={month.value} value={month.value}>
                            {month.label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="years"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>years</FormLabel>
                    <FormControl>
                      <select {...field} className="">
                        <option>years</option>
                        {years.map((years) => (
                          <option key={years.label} value={years.label}>
                            {years.label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="CVC"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          placeholder="CVC"
                          className="w-full"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-[246px] h-[40px] ">
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
