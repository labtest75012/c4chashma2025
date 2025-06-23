"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Pencil, Trash2, Plus, MapPin, Phone, Clock } from "lucide-react"

interface Store {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  email: string
  hours: string
  status: "active" | "closed" | "coming-soon"
  coordinates: {
    lat: number
    lng: number
  }
}

const initialStores: Store[] = [
  {
    id: "1",
    name: "C4 Chashma Flagship Store",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    phone: "+1 (212) 555-1234",
    email: "nyc@c4chashma.com",
    hours: "Mon-Sat: 10am-8pm, Sun: 11am-6pm",
    status: "active",
    coordinates: {
      lat: 40.7128,
      lng: -74.006,
    },
  },
  {
    id: "2",
    name: "C4 Chashma Downtown",
    address: "456 Market Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    country: "USA",
    phone: "+1 (415) 555-6789",
    email: "sf@c4chashma.com",
    hours: "Mon-Sat: 9am-7pm, Sun: 10am-5pm",
    status: "active",
    coordinates: {
      lat: 37.7749,
      lng: -122.4194,
    },
  },
  {
    id: "3",
    name: "C4 Chashma Galleria",
    address: "789 Shopping Center Blvd",
    city: "Houston",
    state: "TX",
    zipCode: "77001",
    country: "USA",
    phone: "+1 (713) 555-4321",
    email: "houston@c4chashma.com",
    hours: "Mon-Sat: 10am-9pm, Sun: 12pm-6pm",
    status: "active",
    coordinates: {
      lat: 29.7604,
      lng: -95.3698,
    },
  },
  {
    id: "4",
    name: "C4 Chashma Magnificent Mile",
    address: "321 Michigan Avenue",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    country: "USA",
    phone: "+1 (312) 555-8765",
    email: "chicago@c4chashma.com",
    hours: "Mon-Sat: 10am-8pm, Sun: 11am-6pm",
    status: "active",
    coordinates: {
      lat: 41.8781,
      lng: -87.6298,
    },
  },
  {
    id: "5",
    name: "C4 Chashma Beverly Hills",
    address: "987 Rodeo Drive",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90210",
    country: "USA",
    phone: "+1 (310) 555-2468",
    email: "la@c4chashma.com",
    hours: "Mon-Sat: 10am-7pm, Sun: 12pm-5pm",
    status: "active",
    coordinates: {
      lat: 34.0522,
      lng: -118.2437,
    },
  },
  {
    id: "6",
    name: "C4 Chashma London",
    address: "10 Oxford Street",
    city: "London",
    state: "",
    zipCode: "W1D 1BS",
    country: "UK",
    phone: "+44 20 7123 4567",
    email: "london@c4chashma.com",
    hours: "Mon-Sat: 9am-8pm, Sun: 11am-5pm",
    status: "coming-soon",
    coordinates: {
      lat: 51.5074,
      lng: -0.1278,
    },
  },
]

export default function StoresManagement() {
  const [stores, setStores] = useState<Store[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentStore, setCurrentStore] = useState<Store | null>(null)
  const [newStore, setNewStore] = useState<Partial<Store>>({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    email: "",
    hours: "",
    status: "active",
    coordinates: {
      lat: 0,
      lng: 0,
    },
  })

  // Load stores from localStorage on component mount
  useEffect(() => {
    const savedStores = localStorage.getItem("adminStores")
    if (savedStores) {
      setStores(JSON.parse(savedStores))
    } else {
      setStores(initialStores)
      localStorage.setItem("adminStores", JSON.stringify(initialStores))
    }
  }, [])

  // Save stores to localStorage whenever they change
  useEffect(() => {
    if (stores.length > 0) {
      localStorage.setItem("adminStores", JSON.stringify(stores))
    }
  }, [stores])

  // Handle adding a new store
  const handleAddStore = () => {
    const newStoreWithId: Store = {
      ...(newStore as Store),
      id: Date.now().toString(),
    }

    setStores([...stores, newStoreWithId])
    setNewStore({
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
      email: "",
      hours: "",
      status: "active",
      coordinates: {
        lat: 0,
        lng: 0,
      },
    })
    setIsAddDialogOpen(false)
  }

  // Handle editing a store
  const handleEditStore = () => {
    if (!currentStore) return

    const updatedStores = stores.map((store) => (store.id === currentStore.id ? currentStore : store))

    setStores(updatedStores)
    setCurrentStore(null)
    setIsEditDialogOpen(false)
  }

  // Handle deleting a store
  const handleDeleteStore = (id: string) => {
    const updatedStores = stores.filter((store) => store.id !== id)
    setStores(updatedStores)
  }

  // Handle input change for new store
  const handleNewStoreChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewStore({
      ...newStore,
      [name]: value,
    })
  }

  // Handle coordinates change for new store
  const handleNewStoreCoordinatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewStore({
      ...newStore,
      coordinates: {
        ...newStore.coordinates,
        [name]: Number.parseFloat(value),
      },
    })
  }

  // Handle select change for new store
  const handleNewStoreSelectChange = (name: string, value: string) => {
    setNewStore({
      ...newStore,
      [name]: value,
    })
  }

  // Handle input change for current store
  const handleCurrentStoreChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentStore) return

    const { name, value } = e.target
    setCurrentStore({
      ...currentStore,
      [name]: value,
    })
  }

  // Handle coordinates change for current store
  const handleCurrentStoreCoordinatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentStore) return

    const { name, value } = e.target
    setCurrentStore({
      ...currentStore,
      coordinates: {
        ...currentStore.coordinates,
        [name]: Number.parseFloat(value),
      },
    })
  }

  // Handle select change for current store
  const handleCurrentStoreSelectChange = (name: string, value: string) => {
    if (!currentStore) return

    setCurrentStore({
      ...currentStore,
      [name]: value,
    })
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "closed":
        return <Badge className="bg-red-500">Closed</Badge>
      case "coming-soon":
        return <Badge className="bg-yellow-500">Coming Soon</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Stores Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Add Store
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Store</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Store Name</Label>
                <Input id="name" name="name" value={newStore.name} onChange={handleNewStoreChange} />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={newStore.address} onChange={handleNewStoreChange} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={newStore.city} onChange={handleNewStoreChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" name="state" value={newStore.state} onChange={handleNewStoreChange} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip/Postal Code</Label>
                  <Input id="zipCode" name="zipCode" value={newStore.zipCode} onChange={handleNewStoreChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" value={newStore.country} onChange={handleNewStoreChange} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={newStore.phone} onChange={handleNewStoreChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" value={newStore.email} onChange={handleNewStoreChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Store Hours</Label>
                <Textarea id="hours" name="hours" value={newStore.hours} onChange={handleNewStoreChange} rows={2} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lat">Latitude</Label>
                  <Input
                    id="lat"
                    name="lat"
                    type="number"
                    step="0.000001"
                    value={newStore.coordinates?.lat}
                    onChange={handleNewStoreCoordinatesChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lng">Longitude</Label>
                  <Input
                    id="lng"
                    name="lng"
                    type="number"
                    step="0.000001"
                    value={newStore.coordinates?.lng}
                    onChange={handleNewStoreCoordinatesChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  onValueChange={(value) =>
                    handleNewStoreSelectChange("status", value as "active" | "closed" | "coming-soon")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="coming-soon">Coming Soon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStore}>Add Store</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Store Locations</CardTitle>
          <CardDescription>Manage your physical store locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Store Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stores.map((store) => (
                  <TableRow key={store.id}>
                    <TableCell className="font-medium">{store.name}</TableCell>
                    <TableCell>
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="mt-0.5 shrink-0" />
                        <div>
                          <div>{store.address}</div>
                          <div>
                            {store.city}, {store.state} {store.zipCode}
                          </div>
                          <div>{store.country}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Phone size={14} />
                          <span>{store.phone}</span>
                        </div>
                        <div>{store.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start gap-2">
                        <Clock size={16} className="mt-0.5 shrink-0" />
                        <div>{store.hours}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(store.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog
                          open={isEditDialogOpen && currentStore?.id === store.id}
                          onOpenChange={(open) => {
                            setIsEditDialogOpen(open)
                            if (!open) setCurrentStore(null)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => setCurrentStore(store)}>
                              <Pencil size={16} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Edit Store</DialogTitle>
                            </DialogHeader>
                            {currentStore && (
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-name">Store Name</Label>
                                  <Input
                                    id="edit-name"
                                    name="name"
                                    value={currentStore.name}
                                    onChange={handleCurrentStoreChange}
                                  />
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-address">Address</Label>
                                    <Input
                                      id="edit-address"
                                      name="address"
                                      value={currentStore.address}
                                      onChange={handleCurrentStoreChange}
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-city">City</Label>
                                    <Input
                                      id="edit-city"
                                      name="city"
                                      value={currentStore.city}
                                      onChange={handleCurrentStoreChange}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-state">State/Province</Label>
                                    <Input
                                      id="edit-state"
                                      name="state"
                                      value={currentStore.state}
                                      onChange={handleCurrentStoreChange}
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-zipCode">Zip/Postal Code</Label>
                                    <Input
                                      id="edit-zipCode"
                                      name="zipCode"
                                      value={currentStore.zipCode}
                                      onChange={handleCurrentStoreChange}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-country">Country</Label>
                                    <Input
                                      id="edit-country"
                                      name="country"
                                      value={currentStore.country}
                                      onChange={handleCurrentStoreChange}
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-phone">Phone</Label>
                                    <Input
                                      id="edit-phone"
                                      name="phone"
                                      value={currentStore.phone}
                                      onChange={handleCurrentStoreChange}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-email">Email</Label>
                                    <Input
                                      id="edit-email"
                                      name="email"
                                      value={currentStore.email}
                                      onChange={handleCurrentStoreChange}
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-hours">Store Hours</Label>
                                  <Textarea
                                    id="edit-hours"
                                    name="hours"
                                    value={currentStore.hours}
                                    onChange={handleCurrentStoreChange}
                                    rows={2}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-lat">Latitude</Label>
                                    <Input
                                      id="edit-lat"
                                      name="lat"
                                      type="number"
                                      step="0.000001"
                                      value={currentStore.coordinates.lat}
                                      onChange={handleCurrentStoreCoordinatesChange}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-lng">Longitude</Label>
                                    <Input
                                      id="edit-lng"
                                      name="lng"
                                      type="number"
                                      step="0.000001"
                                      value={currentStore.coordinates.lng}
                                      onChange={handleCurrentStoreCoordinatesChange}
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-status">Status</Label>
                                  <Select
                                    defaultValue={currentStore.status}
                                    onValueChange={(value) =>
                                      handleCurrentStoreSelectChange(
                                        "status",
                                        value as "active" | "closed" | "coming-soon",
                                      )
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="active">Active</SelectItem>
                                      <SelectItem value="closed">Closed</SelectItem>
                                      <SelectItem value="coming-soon">Coming Soon</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setIsEditDialogOpen(false)
                                  setCurrentStore(null)
                                }}
                              >
                                Cancel
                              </Button>
                              <Button onClick={handleEditStore}>Save Changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="icon" className="text-red-500">
                              <Trash2 size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the store "{store.name}". This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => handleDeleteStore(store.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
