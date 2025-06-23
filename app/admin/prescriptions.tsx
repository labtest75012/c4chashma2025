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
import { Pencil, Trash2, Plus, Search, Eye, Download } from "lucide-react"

interface Prescription {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  doctorName: string
  date: string
  expiryDate: string
  rightEye: {
    sphere: string
    cylinder: string
    axis: string
    add: string
    pd: string
  }
  leftEye: {
    sphere: string
    cylinder: string
    axis: string
    add: string
    pd: string
  }
  notes: string
  status: "active" | "expired" | "pending"
  uploadedFile: string
  createdAt: string
  updatedAt: string
}

const initialPrescriptions: Prescription[] = [
  {
    id: "1",
    customerId: "C001",
    customerName: "John Smith",
    customerEmail: "john.smith@example.com",
    doctorName: "Dr. Sarah Johnson",
    date: "2023-03-15",
    expiryDate: "2024-03-15",
    rightEye: {
      sphere: "-1.50",
      cylinder: "-0.75",
      axis: "180",
      add: "+1.00",
      pd: "32",
    },
    leftEye: {
      sphere: "-1.25",
      cylinder: "-0.50",
      axis: "175",
      add: "+1.00",
      pd: "32",
    },
    notes: "Patient should use computer glasses for extended screen time.",
    status: "active",
    uploadedFile: "/placeholder.svg?height=100&width=100",
    createdAt: "2023-03-15T10:30:00Z",
    updatedAt: "2023-03-15T10:30:00Z",
  },
  {
    id: "2",
    customerId: "C002",
    customerName: "Emily Johnson",
    customerEmail: "emily.johnson@example.com",
    doctorName: "Dr. Michael Chen",
    date: "2022-11-20",
    expiryDate: "2023-11-20",
    rightEye: {
      sphere: "-2.25",
      cylinder: "-1.00",
      axis: "90",
      add: "+1.50",
      pd: "31",
    },
    leftEye: {
      sphere: "-2.00",
      cylinder: "-0.75",
      axis: "85",
      add: "+1.50",
      pd: "31",
    },
    notes: "Progressive lenses recommended for daily use.",
    status: "active",
    uploadedFile: "/placeholder.svg?height=100&width=100",
    createdAt: "2022-11-20T14:45:00Z",
    updatedAt: "2022-11-20T14:45:00Z",
  },
  {
    id: "3",
    customerId: "C003",
    customerName: "Robert Davis",
    customerEmail: "robert.davis@example.com",
    doctorName: "Dr. Lisa Wong",
    date: "2022-08-05",
    expiryDate: "2023-08-05",
    rightEye: {
      sphere: "+1.75",
      cylinder: "-0.50",
      axis: "170",
      add: "+2.00",
      pd: "33",
    },
    leftEye: {
      sphere: "+2.00",
      cylinder: "-0.75",
      axis: "165",
      add: "+2.00",
      pd: "33",
    },
    notes: "Bifocal lenses recommended. Patient has astigmatism.",
    status: "expired",
    uploadedFile: "/placeholder.svg?height=100&width=100",
    createdAt: "2022-08-05T09:15:00Z",
    updatedAt: "2022-08-05T09:15:00Z",
  },
  {
    id: "4",
    customerId: "C004",
    customerName: "Sophia Martinez",
    customerEmail: "sophia.martinez@example.com",
    doctorName: "Dr. James Wilson",
    date: "2023-05-12",
    expiryDate: "2024-05-12",
    rightEye: {
      sphere: "-3.50",
      cylinder: "-1.25",
      axis: "10",
      add: "+0.75",
      pd: "30",
    },
    leftEye: {
      sphere: "-3.75",
      cylinder: "-1.50",
      axis: "15",
      add: "+0.75",
      pd: "30",
    },
    notes: "High index lenses recommended due to prescription strength.",
    status: "active",
    uploadedFile: "/placeholder.svg?height=100&width=100",
    createdAt: "2023-05-12T16:20:00Z",
    updatedAt: "2023-05-12T16:20:00Z",
  },
  {
    id: "5",
    customerId: "C005",
    customerName: "William Brown",
    customerEmail: "william.brown@example.com",
    doctorName: "Dr. Emma Thompson",
    date: "2023-06-30",
    expiryDate: "2024-06-30",
    rightEye: {
      sphere: "-0.75",
      cylinder: "-0.25",
      axis: "180",
      add: "+0.50",
      pd: "32",
    },
    leftEye: {
      sphere: "-0.50",
      cylinder: "-0.25",
      axis: "175",
      add: "+0.50",
      pd: "32",
    },
    notes: "Mild prescription. Patient is new to wearing glasses.",
    status: "pending",
    uploadedFile: "/placeholder.svg?height=100&width=100",
    createdAt: "2023-06-30T11:10:00Z",
    updatedAt: "2023-06-30T11:10:00Z",
  },
]

export default function PrescriptionsManagement() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [currentPrescription, setCurrentPrescription] = useState<Prescription | null>(null)
  const [newPrescription, setNewPrescription] = useState<Partial<Prescription>>({
    customerName: "",
    customerEmail: "",
    doctorName: "",
    date: new Date().toISOString().split("T")[0],
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
    rightEye: {
      sphere: "",
      cylinder: "",
      axis: "",
      add: "",
      pd: "",
    },
    leftEye: {
      sphere: "",
      cylinder: "",
      axis: "",
      add: "",
      pd: "",
    },
    notes: "",
    status: "active",
    uploadedFile: "/placeholder.svg?height=100&width=100",
  })

  // Load prescriptions from localStorage on component mount
  useEffect(() => {
    const savedPrescriptions = localStorage.getItem("adminPrescriptions")
    if (savedPrescriptions) {
      setPrescriptions(JSON.parse(savedPrescriptions))
    } else {
      setPrescriptions(initialPrescriptions)
      localStorage.setItem("adminPrescriptions", JSON.stringify(initialPrescriptions))
    }
  }, [])

  // Save prescriptions to localStorage whenever they change
  useEffect(() => {
    if (prescriptions.length > 0) {
      localStorage.setItem("adminPrescriptions", JSON.stringify(prescriptions))
    }
  }, [prescriptions])

  // Filter prescriptions based on search term and status
  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch =
      prescription.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || prescription.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Handle adding a new prescription
  const handleAddPrescription = () => {
    const newPrescriptionWithId: Prescription = {
      ...(newPrescription as Prescription),
      id: `P${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      customerId: `C${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setPrescriptions([...prescriptions, newPrescriptionWithId])
    setNewPrescription({
      customerName: "",
      customerEmail: "",
      doctorName: "",
      date: new Date().toISOString().split("T")[0],
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
      rightEye: {
        sphere: "",
        cylinder: "",
        axis: "",
        add: "",
        pd: "",
      },
      leftEye: {
        sphere: "",
        cylinder: "",
        axis: "",
        add: "",
        pd: "",
      },
      notes: "",
      status: "active",
      uploadedFile: "/placeholder.svg?height=100&width=100",
    })
    setIsAddDialogOpen(false)
  }

  // Handle editing a prescription
  const handleEditPrescription = () => {
    if (!currentPrescription) return

    const updatedPrescriptions = prescriptions.map((prescription) =>
      prescription.id === currentPrescription.id
        ? { ...currentPrescription, updatedAt: new Date().toISOString() }
        : prescription,
    )

    setPrescriptions(updatedPrescriptions)
    setCurrentPrescription(null)
    setIsEditDialogOpen(false)
  }

  // Handle deleting a prescription
  const handleDeletePrescription = (id: string) => {
    const updatedPrescriptions = prescriptions.filter((prescription) => prescription.id !== id)
    setPrescriptions(updatedPrescriptions)
  }

  // Handle input change for new prescription
  const handleNewPrescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setNewPrescription({
        ...newPrescription,
        [parent]: {
          ...newPrescription[parent as keyof Prescription],
          [child]: value,
        },
      })
    } else {
      setNewPrescription({
        ...newPrescription,
        [name]: value,
      })
    }
  }

  // Handle select change for new prescription
  const handleNewPrescriptionSelectChange = (name: string, value: string) => {
    setNewPrescription({
      ...newPrescription,
      [name]: value,
    })
  }

  // Handle input change for current prescription
  const handleCurrentPrescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentPrescription) return

    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setCurrentPrescription({
        ...currentPrescription,
        [parent]: {
          ...currentPrescription[parent as keyof Prescription],
          [child]: value,
        },
      })
    } else {
      setCurrentPrescription({
        ...currentPrescription,
        [name]: value,
      })
    }
  }

  // Handle select change for current prescription
  const handleCurrentPrescriptionSelectChange = (name: string, value: string) => {
    if (!currentPrescription) return

    setCurrentPrescription({
      ...currentPrescription,
      [name]: value,
    })
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "expired":
        return <Badge className="bg-red-500">Expired</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Prescriptions Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Add Prescription
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Prescription</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    name="customerName"
                    value={newPrescription.customerName}
                    onChange={handleNewPrescriptionChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Customer Email</Label>
                  <Input
                    id="customerEmail"
                    name="customerEmail"
                    type="email"
                    value={newPrescription.customerEmail}
                    onChange={handleNewPrescriptionChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doctorName">Doctor Name</Label>
                  <Input
                    id="doctorName"
                    name="doctorName"
                    value={newPrescription.doctorName}
                    onChange={handleNewPrescriptionChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Prescription Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={newPrescription.date}
                    onChange={handleNewPrescriptionChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    value={newPrescription.expiryDate}
                    onChange={handleNewPrescriptionChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Right Eye (OD)</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="rightEye.sphere">Sphere (SPH)</Label>
                      <Input
                        id="rightEye.sphere"
                        name="rightEye.sphere"
                        value={newPrescription.rightEye?.sphere}
                        onChange={handleNewPrescriptionChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rightEye.cylinder">Cylinder (CYL)</Label>
                      <Input
                        id="rightEye.cylinder"
                        name="rightEye.cylinder"
                        value={newPrescription.rightEye?.cylinder}
                        onChange={handleNewPrescriptionChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rightEye.axis">Axis</Label>
                      <Input
                        id="rightEye.axis"
                        name="rightEye.axis"
                        value={newPrescription.rightEye?.axis}
                        onChange={handleNewPrescriptionChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rightEye.add">Add</Label>
                      <Input
                        id="rightEye.add"
                        name="rightEye.add"
                        value={newPrescription.rightEye?.add}
                        onChange={handleNewPrescriptionChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rightEye.pd">PD</Label>
                      <Input
                        id="rightEye.pd"
                        name="rightEye.pd"
                        value={newPrescription.rightEye?.pd}
                        onChange={handleNewPrescriptionChange}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Left Eye (OS)</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="leftEye.sphere">Sphere (SPH)</Label>
                      <Input
                        id="leftEye.sphere"
                        name="leftEye.sphere"
                        value={newPrescription.leftEye?.sphere}
                        onChange={handleNewPrescriptionChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="leftEye.cylinder">Cylinder (CYL)</Label>
                      <Input
                        id="leftEye.cylinder"
                        name="leftEye.cylinder"
                        value={newPrescription.leftEye?.cylinder}
                        onChange={handleNewPrescriptionChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="leftEye.axis">Axis</Label>
                      <Input
                        id="leftEye.axis"
                        name="leftEye.axis"
                        value={newPrescription.leftEye?.axis}
                        onChange={handleNewPrescriptionChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="leftEye.add">Add</Label>
                      <Input
                        id="leftEye.add"
                        name="leftEye.add"
                        value={newPrescription.leftEye?.add}
                        onChange={handleNewPrescriptionChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="leftEye.pd">PD</Label>
                      <Input
                        id="leftEye.pd"
                        name="leftEye.pd"
                        value={newPrescription.leftEye?.pd}
                        onChange={handleNewPrescriptionChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={newPrescription.notes}
                  onChange={handleNewPrescriptionChange}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  onValueChange={(value) =>
                    handleNewPrescriptionSelectChange("status", value as "active" | "expired" | "pending")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="uploadedFile">Prescription Image URL</Label>
                <Input
                  id="uploadedFile"
                  name="uploadedFile"
                  value={newPrescription.uploadedFile}
                  onChange={handleNewPrescriptionChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPrescription}>Add Prescription</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Prescriptions</CardTitle>
          <CardDescription>Manage eye prescriptions for your customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer or doctor..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Customer</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrescriptions.length > 0 ? (
                  filteredPrescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{prescription.customerName}</div>
                          <div className="text-xs text-gray-500">{prescription.customerEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>{prescription.doctorName}</TableCell>
                      <TableCell>{new Date(prescription.date).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(prescription.expiryDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(prescription.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog
                            open={isViewDialogOpen && currentPrescription?.id === prescription.id}
                            onOpenChange={(open) => {
                              setIsViewDialogOpen(open)
                              if (!open) setCurrentPrescription(null)
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setCurrentPrescription(prescription)}
                              >
                                <Eye size={16} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Prescription Details</DialogTitle>
                              </DialogHeader>
                              {currentPrescription && (
                                <div className="space-y-6">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="text-lg font-semibold">{currentPrescription.customerName}</h3>
                                      <p className="text-sm text-gray-500">{currentPrescription.customerEmail}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm">
                                        ID: <span className="font-medium">{currentPrescription.id}</span>
                                      </p>
                                      <p className="text-sm">
                                        Customer ID:{" "}
                                        <span className="font-medium">{currentPrescription.customerId}</span>
                                      </p>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-3 gap-4">
                                    <div>
                                      <p className="text-sm text-gray-500">Doctor</p>
                                      <p className="font-medium">{currentPrescription.doctorName}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Prescription Date</p>
                                      <p className="font-medium">
                                        {new Date(currentPrescription.date).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Expiry Date</p>
                                      <p className="font-medium">
                                        {new Date(currentPrescription.expiryDate).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                                    <div>
                                      <h4 className="font-semibold mb-2">Right Eye (OD)</h4>
                                      <div className="grid grid-cols-5 gap-2 text-sm">
                                        <div>
                                          <p className="text-gray-500">SPH</p>
                                          <p className="font-medium">{currentPrescription.rightEye.sphere}</p>
                                        </div>
                                        <div>
                                          <p className="text-gray-500">CYL</p>
                                          <p className="font-medium">{currentPrescription.rightEye.cylinder}</p>
                                        </div>
                                        <div>
                                          <p className="text-gray-500">AXIS</p>
                                          <p className="font-medium">{currentPrescription.rightEye.axis}</p>
                                        </div>
                                        <div>
                                          <p className="text-gray-500">ADD</p>
                                          <p className="font-medium">{currentPrescription.rightEye.add}</p>
                                        </div>
                                        <div>
                                          <p className="text-gray-500">PD</p>
                                          <p className="font-medium">{currentPrescription.rightEye.pd}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Left Eye (OS)</h4>
                                      <div className="grid grid-cols-5 gap-2 text-sm">
                                        <div>
                                          <p className="text-gray-500">SPH</p>
                                          <p className="font-medium">{currentPrescription.leftEye.sphere}</p>
                                        </div>
                                        <div>
                                          <p className="text-gray-500">CYL</p>
                                          <p className="font-medium">{currentPrescription.leftEye.cylinder}</p>
                                        </div>
                                        <div>
                                          <p className="text-gray-500">AXIS</p>
                                          <p className="font-medium">{currentPrescription.leftEye.axis}</p>
                                        </div>
                                        <div>
                                          <p className="text-gray-500">ADD</p>
                                          <p className="font-medium">{currentPrescription.leftEye.add}</p>
                                        </div>
                                        <div>
                                          <p className="text-gray-500">PD</p>
                                          <p className="font-medium">{currentPrescription.leftEye.pd}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {currentPrescription.notes && (
                                    <div>
                                      <h4 className="font-semibold mb-1">Notes</h4>
                                      <p className="text-sm">{currentPrescription.notes}</p>
                                    </div>
                                  )}

                                  <div className="flex justify-between items-center">
                                    <div>{getStatusBadge(currentPrescription.status)}</div>
                                    <Button variant="outline" className="flex items-center gap-2">
                                      <Download size={16} />
                                      Download Prescription
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Dialog
                            open={isEditDialogOpen && currentPrescription?.id === prescription.id}
                            onOpenChange={(open) => {
                              setIsEditDialogOpen(open)
                              if (!open) setCurrentPrescription(null)
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setCurrentPrescription(prescription)}
                              >
                                <Pencil size={16} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Edit Prescription</DialogTitle>
                              </DialogHeader>
                              {currentPrescription && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-customerName">Customer Name</Label>
                                      <Input
                                        id="edit-customerName"
                                        name="customerName"
                                        value={currentPrescription.customerName}
                                        onChange={handleCurrentPrescriptionChange}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-customerEmail">Customer Email</Label>
                                      <Input
                                        id="edit-customerEmail"
                                        name="customerEmail"
                                        type="email"
                                        value={currentPrescription.customerEmail}
                                        onChange={handleCurrentPrescriptionChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-doctorName">Doctor Name</Label>
                                      <Input
                                        id="edit-doctorName"
                                        name="doctorName"
                                        value={currentPrescription.doctorName}
                                        onChange={handleCurrentPrescriptionChange}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-date">Prescription Date</Label>
                                      <Input
                                        id="edit-date"
                                        name="date"
                                        type="date"
                                        value={currentPrescription.date}
                                        onChange={handleCurrentPrescriptionChange}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-expiryDate">Expiry Date</Label>
                                      <Input
                                        id="edit-expiryDate"
                                        name="expiryDate"
                                        type="date"
                                        value={currentPrescription.expiryDate}
                                        onChange={handleCurrentPrescriptionChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-6">
                                    <div>
                                      <h3 className="font-medium mb-2">Right Eye (OD)</h3>
                                      <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-rightEye.sphere">Sphere (SPH)</Label>
                                          <Input
                                            id="edit-rightEye.sphere"
                                            name="rightEye.sphere"
                                            value={currentPrescription.rightEye.sphere}
                                            onChange={handleCurrentPrescriptionChange}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-rightEye.cylinder">Cylinder (CYL)</Label>
                                          <Input
                                            id="edit-rightEye.cylinder"
                                            name="rightEye.cylinder"
                                            value={currentPrescription.rightEye.cylinder}
                                            onChange={handleCurrentPrescriptionChange}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-rightEye.axis">Axis</Label>
                                          <Input
                                            id="edit-rightEye.axis"
                                            name="rightEye.axis"
                                            value={currentPrescription.rightEye.axis}
                                            onChange={handleCurrentPrescriptionChange}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-rightEye.add">Add</Label>
                                          <Input
                                            id="edit-rightEye.add"
                                            name="rightEye.add"
                                            value={currentPrescription.rightEye.add}
                                            onChange={handleCurrentPrescriptionChange}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-rightEye.pd">PD</Label>
                                          <Input
                                            id="edit-rightEye.pd"
                                            name="rightEye.pd"
                                            value={currentPrescription.rightEye.pd}
                                            onChange={handleCurrentPrescriptionChange}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <h3 className="font-medium mb-2">Left Eye (OS)</h3>
                                      <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-leftEye.sphere">Sphere (SPH)</Label>
                                          <Input
                                            id="edit-leftEye.sphere"
                                            name="leftEye.sphere"
                                            value={currentPrescription.leftEye.sphere}
                                            onChange={handleCurrentPrescriptionChange}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-leftEye.cylinder">Cylinder (CYL)</Label>
                                          <Input
                                            id="edit-leftEye.cylinder"
                                            name="leftEye.cylinder"
                                            value={currentPrescription.leftEye.cylinder}
                                            onChange={handleCurrentPrescriptionChange}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-leftEye.axis">Axis</Label>
                                          <Input
                                            id="edit-leftEye.axis"
                                            name="leftEye.axis"
                                            value={currentPrescription.leftEye.axis}
                                            onChange={handleCurrentPrescriptionChange}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-leftEye.add">Add</Label>
                                          <Input
                                            id="edit-leftEye.add"
                                            name="leftEye.add"
                                            value={currentPrescription.leftEye.add}
                                            onChange={handleCurrentPrescriptionChange}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-leftEye.pd">PD</Label>
                                          <Input
                                            id="edit-leftEye.pd"
                                            name="leftEye.pd"
                                            value={currentPrescription.leftEye.pd}
                                            onChange={handleCurrentPrescriptionChange}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-notes">Notes</Label>
                                    <Textarea
                                      id="edit-notes"
                                      name="notes"
                                      value={currentPrescription.notes}
                                      onChange={handleCurrentPrescriptionChange}
                                      rows={3}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-status">Status</Label>
                                    <Select
                                      defaultValue={currentPrescription.status}
                                      onValueChange={(value) =>
                                        handleCurrentPrescriptionSelectChange(
                                          "status",
                                          value as "active" | "expired" | "pending",
                                        )
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="expired">Expired</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
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
                                    setCurrentPrescription(null)
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button onClick={handleEditPrescription}>Save Changes</Button>
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
                                  This will permanently delete this prescription record. This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500 hover:bg-red-600"
                                  onClick={() => handleDeletePrescription(prescription.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No prescriptions found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
