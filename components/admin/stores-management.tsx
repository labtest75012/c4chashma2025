"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2 } from "lucide-react"

// Import the storage service
import { getStorageItem, setStorageItem } from "@/utils/storage-service"

// Import validation utilities
import { validateField } from "@/utils/form-validation"
import { useToast } from "@/components/ui/use-toast"

export default function StoresManagement() {
  const [stores, setStores] = useState<any[]>([])
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false)
  const [selectedStore, setSelectedStore] = useState<any>(null)
  const [newStore, setNewStore] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
    openingHours: {
      monday: { open: "10:00", close: "19:00", closed: false },
      tuesday: { open: "10:00", close: "19:00", closed: false },
      wednesday: { open: "10:00", close: "19:00", closed: false },
      thursday: { open: "10:00", close: "19:00", closed: false },
      friday: { open: "10:00", close: "19:00", closed: false },
      saturday: { open: "10:00", close: "19:00", closed: false },
      sunday: { open: "11:00", close: "17:00", closed: false },
    },
    services: ["Eye Tests", "Frame Fitting", "Contact Lens Fitting"],
    doctors: [],
  })

  // Add toast to the component
  const { toast } = useToast()

  // Add form validation state
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Load stores from localStorage
  useEffect(() => {
    const storedStores = getStorageItem<any[]>("c4chashma_stores", [])

    if (storedStores.length > 0) {
      setStores(storedStores)
    } else {
      // Default stores if none in localStorage
      const defaultStores = [
        {
          id: "1",
          name: "C4 Chashma - Bandra",
          address: "24, Hill Road",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400050",
          phone: "+91 98765 43210",
          email: "bandra@c4chashma.com",
          openingHours: {
            monday: { open: "10:00", close: "19:00", closed: false },
            tuesday: { open: "10:00", close: "19:00", closed: false },
            wednesday: { open: "10:00", close: "19:00", closed: false },
            thursday: { open: "10:00", close: "19:00", closed: false },
            friday: { open: "10:00", close: "19:00", closed: false },
            saturday: { open: "10:00", close: "19:00", closed: false },
            sunday: { open: "11:00", close: "17:00", closed: false },
          },
          services: ["Eye Tests", "Frame Fitting", "Contact Lens Fitting"],
          doctors: [
            { name: "Dr. Sharma", specialization: "Optometrist", days: ["Monday", "Wednesday", "Friday"] },
            { name: "Dr. Patel", specialization: "Ophthalmologist", days: ["Tuesday", "Thursday"] },
          ],
        },
        {
          id: "2",
          name: "C4 Chashma - Andheri",
          address: "Shop 5, Infiniti Mall",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400053",
          phone: "+91 98765 43211",
          email: "andheri@c4chashma.com",
          openingHours: {
            monday: { open: "11:00", close: "21:00", closed: false },
            tuesday: { open: "11:00", close: "21:00", closed: false },
            wednesday: { open: "11:00", close: "21:00", closed: false },
            thursday: { open: "11:00", close: "21:00", closed: false },
            friday: { open: "11:00", close: "21:00", closed: false },
            saturday: { open: "11:00", close: "21:00", closed: false },
            sunday: { open: "11:00", close: "21:00", closed: false },
          },
          services: ["Eye Tests", "Frame Fitting", "Contact Lens Fitting", "Sunglasses Customization"],
          doctors: [
            { name: "Dr. Mehta", specialization: "Optometrist", days: ["Monday", "Tuesday", "Wednesday"] },
            { name: "Dr. Singh", specialization: "Ophthalmologist", days: ["Thursday", "Friday", "Saturday"] },
          ],
        },
      ]
      setStores(defaultStores)
      setStorageItem("c4chashma_stores", defaultStores)
    }
  }, [])

  // Save stores to localStorage whenever they change
  useEffect(() => {
    if (stores.length > 0) {
      setStorageItem("c4chashma_stores", stores)
    }
  }, [stores])

  // Add new store
  const handleAddStore = () => {
    // Validate required fields
    const errors: Record<string, string> = {}

    const nameValidation = validateField(newStore.name, [{ type: "required" }])
    if (!nameValidation.valid) errors.name = nameValidation.message

    const addressValidation = validateField(newStore.address, [{ type: "required" }])
    if (!addressValidation.valid) errors.address = addressValidation.message

    const cityValidation = validateField(newStore.city, [{ type: "required" }])
    if (!cityValidation.valid) errors.city = cityValidation.message

    const phoneValidation = validateField(newStore.phone, [{ type: "phone" }])
    if (!phoneValidation.valid) errors.phone = phoneValidation.message

    const emailValidation = validateField(newStore.email, [{ type: "email" }])
    if (!emailValidation.valid) errors.email = emailValidation.message

    // If there are errors, show them and stop
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // Clear any previous errors
    setFormErrors({})

    const newId = (Math.max(...stores.map((s) => Number.parseInt(s.id)), 0) + 1).toString()

    const storeToAdd = {
      ...newStore,
      id: newId,
    }

    setStores([...stores, storeToAdd])
    setIsAddStoreOpen(false)

    // Reset the form
    setNewStore({
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      email: "",
      openingHours: {
        monday: { open: "10:00", close: "19:00", closed: false },
        tuesday: { open: "10:00", close: "19:00", closed: false },
        wednesday: { open: "10:00", close: "19:00", closed: false },
        thursday: { open: "10:00", close: "19:00", closed: false },
        friday: { open: "10:00", close: "19:00", closed: false },
        saturday: { open: "10:00", close: "19:00", closed: false },
        sunday: { open: "11:00", close: "17:00", closed: false },
      },
      services: ["Eye Tests", "Frame Fitting", "Contact Lens Fitting"],
      doctors: [],
    })

    // Show success message
    toast({
      title: "Store added successfully",
      description: `${storeToAdd.name} has been added to your stores.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stores Management</CardTitle>
        <CardDescription>Manage your stores and their details here.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button onClick={() => setIsAddStoreOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Store
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stores.map((store) => (
              <TableRow key={store.id}>
                <TableCell>{store.name}</TableCell>
                <TableCell>{store.address}</TableCell>
                <TableCell>{store.city}</TableCell>
                <TableCell>{store.phone}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedStore(store)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Add Store Dialog */}
        <Dialog open={isAddStoreOpen} onOpenChange={setIsAddStoreOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Store</DialogTitle>
              <DialogDescription>Add a new store to your list.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <div className="col-span-3 space-y-1">
                  <Input
                    id="name"
                    value={newStore.name}
                    onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                    className={formErrors.name ? "border-red-500" : ""}
                  />
                  {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <div className="col-span-3 space-y-1">
                  <Textarea
                    id="address"
                    value={newStore.address}
                    onChange={(e) => setNewStore({ ...newStore, address: e.target.value })}
                    className={formErrors.address ? "border-red-500" : ""}
                  />
                  {formErrors.address && <p className="text-red-500 text-xs">{formErrors.address}</p>}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right">
                  City
                </Label>
                <div className="col-span-3 space-y-1">
                  <Input
                    id="city"
                    value={newStore.city}
                    onChange={(e) => setNewStore({ ...newStore, city: e.target.value })}
                    className={formErrors.city ? "border-red-500" : ""}
                  />
                  {formErrors.city && <p className="text-red-500 text-xs">{formErrors.city}</p>}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="state" className="text-right">
                  State
                </Label>
                <Input
                  id="state"
                  value={newStore.state}
                  onChange={(e) => setNewStore({ ...newStore, state: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pincode" className="text-right">
                  Pincode
                </Label>
                <Input
                  id="pincode"
                  value={newStore.pincode}
                  onChange={(e) => setNewStore({ ...newStore, pincode: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <div className="col-span-3 space-y-1">
                  <Input
                    id="phone"
                    value={newStore.phone}
                    onChange={(e) => setNewStore({ ...newStore, phone: e.target.value })}
                    className={formErrors.phone ? "border-red-500" : ""}
                  />
                  {formErrors.phone && <p className="text-red-500 text-xs">{formErrors.phone}</p>}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <div className="col-span-3 space-y-1">
                  <Input
                    id="email"
                    value={newStore.email}
                    onChange={(e) => setNewStore({ ...newStore, email: e.target.value })}
                    className={formErrors.email ? "border-red-500" : ""}
                  />
                  {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setIsAddStoreOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleAddStore}>
                Add Store
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Store Dialog */}
        <Dialog open={selectedStore !== null} onOpenChange={() => setSelectedStore(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Store</DialogTitle>
              <DialogDescription>Edit the details of the selected store.</DialogDescription>
            </DialogHeader>
            {selectedStore && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={selectedStore.name}
                    onChange={(e) =>
                      setStores(stores.map((s) => (s.id === selectedStore.id ? { ...s, name: e.target.value } : s)))
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    value={selectedStore.address}
                    onChange={(e) =>
                      setStores(stores.map((s) => (s.id === selectedStore.id ? { ...s, address: e.target.value } : s)))
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="city" className="text-right">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={selectedStore.city}
                    onChange={(e) =>
                      setStores(stores.map((s) => (s.id === selectedStore.id ? { ...s, city: e.target.value } : s)))
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="state" className="text-right">
                    State
                  </Label>
                  <Input
                    id="state"
                    value={selectedStore.state}
                    onChange={(e) =>
                      setStores(stores.map((s) => (s.id === selectedStore.id ? { ...s, state: e.target.value } : s)))
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pincode" className="text-right">
                    Pincode
                  </Label>
                  <Input
                    id="pincode"
                    value={selectedStore.pincode}
                    onChange={(e) =>
                      setStores(stores.map((s) => (s.id === selectedStore.id ? { ...s, pincode: e.target.value } : s)))
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={selectedStore.phone}
                    onChange={(e) =>
                      setStores(stores.map((s) => (s.id === selectedStore.id ? { ...s, phone: e.target.value } : s)))
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={selectedStore.email}
                    onChange={(e) =>
                      setStores(stores.map((s) => (s.id === selectedStore.id ? { ...s, email: e.target.value } : s)))
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setSelectedStore(null)}>
                Cancel
              </Button>
              <Button type="submit" onClick={() => setSelectedStore(null)}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
