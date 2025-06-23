"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Search, Filter, Eye, Check, X, Plus, Pencil, Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Appointment {
  id: string
  customer: string
  date: string
  time: string
  service: string
  doctor: string
  status: string
  notes?: string
  phone: string
}

interface AppointmentsTabProps {
  appointments: Appointment[]
  setAppointments: (appointments: Appointment[]) => void
}

export default function AppointmentsTab({ appointments, setAppointments }: AppointmentsTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(null)
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    customer: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "10:00 AM",
    service: "Eye Test",
    doctor: "",
    status: "Scheduled",
    notes: "",
    phone: "",
  })

  // Filter appointments based on search term, status filter, and date filter
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || appointment.status.toLowerCase() === statusFilter.toLowerCase()

    const matchesDate = !dateFilter || appointment.date === format(dateFilter, "yyyy-MM-dd")

    return matchesSearch && matchesStatus && matchesDate
  })

  // Update appointment status
  const updateAppointmentStatus = (appointmentId: string, newStatus: string) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === appointmentId ? { ...appointment, status: newStatus } : appointment,
    )
    setAppointments(updatedAppointments)

    toast({
      title: "Appointment status updated",
      description: `The appointment status has been changed to ${newStatus}`,
    })
  }

  // Handle adding a new appointment
  const handleAddAppointment = () => {
    if (!newAppointment.customer || !newAppointment.date || !newAppointment.time || !newAppointment.service) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const newId = Math.max(...appointments.map((a) => Number.parseInt(a.id)), 0) + 1

    const appointmentToAdd: Appointment = {
      id: newId.toString(),
      customer: newAppointment.customer || "",
      date: newAppointment.date || format(new Date(), "yyyy-MM-dd"),
      time: newAppointment.time || "10:00 AM",
      service: newAppointment.service || "Eye Test",
      doctor: newAppointment.doctor || "Dr. Sharma",
      status: newAppointment.status || "Scheduled",
      notes: newAppointment.notes,
      phone: newAppointment.phone || "",
    }

    setAppointments([...appointments, appointmentToAdd])
    setIsAddDialogOpen(false)
    setNewAppointment({
      customer: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "10:00 AM",
      service: "Eye Test",
      doctor: "",
      status: "Scheduled",
      notes: "",
      phone: "",
    })

    toast({
      title: "Appointment added",
      description: "The appointment has been added successfully",
    })
  }

  // Handle editing an appointment
  const handleEditAppointment = () => {
    if (!selectedAppointment) return

    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === selectedAppointment.id ? selectedAppointment : appointment,
    )

    setAppointments(updatedAppointments)
    setSelectedAppointment(null)
    setIsEditDialogOpen(false)

    toast({
      title: "Appointment updated",
      description: "The appointment has been updated successfully",
    })
  }

  // Handle deleting an appointment
  const handleDeleteAppointment = () => {
    if (!appointmentToDelete) return

    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentToDelete)
    setAppointments(updatedAppointments)
    setAppointmentToDelete(null)
    setDeleteConfirmOpen(false)

    toast({
      title: "Appointment deleted",
      description: "The appointment has been deleted successfully",
    })
  }

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "no-show":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Appointment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Management</CardTitle>
          <CardDescription>Manage eye test and consultation appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by customer, service or doctor..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="no-show">No Show</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus />
                </PopoverContent>
              </Popover>

              {(dateFilter || statusFilter !== "all") && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setDateFilter(undefined)
                    setStatusFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.customer}</TableCell>
                      <TableCell>{appointment.service}</TableCell>
                      <TableCell>
                        {new Date(appointment.date).toLocaleDateString()}, {appointment.time}
                      </TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedAppointment(appointment)
                              setIsViewDialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedAppointment(appointment)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500"
                            onClick={() => {
                              setAppointmentToDelete(appointment.id)
                              setDeleteConfirmOpen(true)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      No appointments found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Appointment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              {selectedAppointment &&
                `${new Date(selectedAppointment.date).toLocaleDateString()} at ${selectedAppointment.time}`}
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Customer</p>
                  <p className="font-medium">{selectedAppointment.customer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p>{selectedAppointment.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Service</p>
                  <p>{selectedAppointment.service}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Doctor</p>
                  <p>{selectedAppointment.doctor}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Notes</p>
                <p className="text-sm">{selectedAppointment.notes || "No additional notes provided."}</p>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-medium text-gray-500 mb-2">Status</p>
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(selectedAppointment.status)}>{selectedAppointment.status}</Badge>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-500 text-green-600 hover:bg-green-50"
                      onClick={() => updateAppointmentStatus(selectedAppointment.id, "Completed")}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Complete
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-600 hover:bg-red-50"
                      onClick={() => updateAppointmentStatus(selectedAppointment.id, "Cancelled")}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Appointment Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Appointment</DialogTitle>
            <DialogDescription>Schedule a new appointment</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer Name*</Label>
              <Input
                id="customer"
                value={newAppointment.customer}
                onChange={(e) => setNewAppointment({ ...newAppointment, customer: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number*</Label>
              <Input
                id="phone"
                value={newAppointment.phone}
                onChange={(e) => setNewAppointment({ ...newAppointment, phone: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date*</Label>
                <Input
                  id="date"
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time*</Label>
                <Input
                  id="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service">Service*</Label>
                <Select
                  value={newAppointment.service}
                  onValueChange={(value) => setNewAppointment({ ...newAppointment, service: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Eye Test">Eye Test</SelectItem>
                    <SelectItem value="Frame Fitting">Frame Fitting</SelectItem>
                    <SelectItem value="Contact Lens Fitting">Contact Lens Fitting</SelectItem>
                    <SelectItem value="Glasses Adjustment">Glasses Adjustment</SelectItem>
                    <SelectItem value="Glasses Repair">Glasses Repair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor">Doctor*</Label>
                <Input
                  id="doctor"
                  value={newAppointment.doctor}
                  onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAppointment}>Add Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Appointment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
            <DialogDescription>Update appointment details</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-customer">Customer Name*</Label>
                <Input
                  id="edit-customer"
                  value={selectedAppointment.customer}
                  onChange={(e) => setSelectedAppointment({ ...selectedAppointment, customer: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone Number*</Label>
                <Input
                  id="edit-phone"
                  value={selectedAppointment.phone}
                  onChange={(e) => setSelectedAppointment({ ...selectedAppointment, phone: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Date*</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={selectedAppointment.date}
                    onChange={(e) => setSelectedAppointment({ ...selectedAppointment, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-time">Time*</Label>
                  <Input
                    id="edit-time"
                    value={selectedAppointment.time}
                    onChange={(e) => setSelectedAppointment({ ...selectedAppointment, time: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-service">Service*</Label>
                  <Select
                    value={selectedAppointment.service}
                    onValueChange={(value) => setSelectedAppointment({ ...selectedAppointment, service: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Eye Test">Eye Test</SelectItem>
                      <SelectItem value="Frame Fitting">Frame Fitting</SelectItem>
                      <SelectItem value="Contact Lens Fitting">Contact Lens Fitting</SelectItem>
                      <SelectItem value="Glasses Adjustment">Glasses Adjustment</SelectItem>
                      <SelectItem value="Glasses Repair">Glasses Repair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-doctor">Doctor*</Label>
                  <Input
                    id="edit-doctor"
                    value={selectedAppointment.doctor}
                    onChange={(e) => setSelectedAppointment({ ...selectedAppointment, doctor: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status*</Label>
                <Select
                  value={selectedAppointment.status}
                  onValueChange={(value) => setSelectedAppointment({ ...selectedAppointment, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                    <SelectItem value="No-Show">No-Show</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={selectedAppointment.notes || ""}
                  onChange={(e) => setSelectedAppointment({ ...selectedAppointment, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditAppointment}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this appointment. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAppointmentToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={handleDeleteAppointment}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
