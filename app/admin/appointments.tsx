"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Pencil, Trash2, Plus, Calendar } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { format } from "date-fns"

// Initial appointments data
const initialAppointments = [
  {
    id: 1,
    customer: "John Doe",
    date: "2023-05-20",
    time: "10:00 AM",
    service: "Eye Test",
    status: "Completed",
    notes: "First time customer",
    contact: "+91 98765 43210",
  },
  {
    id: 2,
    customer: "Jane Smith",
    date: "2023-05-21",
    time: "11:30 AM",
    service: "Frame Fitting",
    status: "Scheduled",
    notes: "Looking for designer frames",
    contact: "+91 87654 32109",
  },
  {
    id: 3,
    customer: "Mike Johnson",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "2:00 PM",
    service: "Contact Lens Fitting",
    status: "Scheduled",
    notes: "First time wearing contacts",
    contact: "+91 76543 21098",
  },
]

export default function AppointmentsTab({
  appointments: propAppointments,
  setAppointments: propSetAppointments,
}: {
  appointments: any[]
  setAppointments: (appointments: any[]) => void
}) {
  // Use props if provided, otherwise use local state
  const [localAppointments, setLocalAppointments] = useState<any[]>([])

  // Initialize from localStorage or default data
  useEffect(() => {
    const savedAppointments = localStorage.getItem("adminAppointments")
    if (savedAppointments) {
      setLocalAppointments(JSON.parse(savedAppointments))
    } else {
      setLocalAppointments(initialAppointments)
      localStorage.setItem("adminAppointments", JSON.stringify(initialAppointments))
    }
  }, [])

  // Save to localStorage when appointments change
  useEffect(() => {
    if (localAppointments.length > 0) {
      localStorage.setItem("adminAppointments", JSON.stringify(localAppointments))
    }
  }, [localAppointments])

  // Use either props or local state
  const appointments = propAppointments || localAppointments
  const setAppointments = propSetAppointments || setLocalAppointments

  const [editingAppointment, setEditingAppointment] = useState<any>(null)
  const [appointmentSearch, setAppointmentSearch] = useState("")
  const [appointmentFilter, setAppointmentFilter] = useState<string | null>(null)
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(null)
  const [deleteAppointmentOpen, setDeleteAppointmentOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"))

  // Filter appointments
  const filteredAppointments = appointments
    .filter((appointment) => {
      // Apply search filter
      const matchesSearch = appointment.customer.toLowerCase().includes(appointmentSearch.toLowerCase())

      // Apply status filter
      const matchesFilter = !appointmentFilter || appointment.status === appointmentFilter

      // Apply date filter
      const matchesDate = !selectedDate || appointment.date === selectedDate

      return matchesSearch && matchesFilter && matchesDate
    })
    .sort((a, b) => new Date(a.date + " " + a.time).getTime() - new Date(b.date + " " + b.time).getTime())

  const handleDeleteAppointment = (id: number) => {
    setAppointmentToDelete(id)
    setDeleteAppointmentOpen(true)
  }

  const confirmDeleteAppointment = () => {
    if (appointmentToDelete) {
      setAppointments(appointments.filter((appointment) => appointment.id !== appointmentToDelete))
      toast({
        title: "Appointment deleted",
        description: "The appointment has been deleted successfully",
      })
      setDeleteAppointmentOpen(false)
      setAppointmentToDelete(null)
    }
  }

  const handleEditAppointment = (appointment: any) => {
    setEditingAppointment({ ...appointment })
  }

  const handleSaveAppointment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingAppointment.customer || !editingAppointment.date || !editingAppointment.time) {
      toast({
        title: "Validation Error",
        description: "Customer name, date, and time are required",
        variant: "destructive",
      })
      return
    }

    if (editingAppointment) {
      if (editingAppointment.id) {
        // Update existing appointment
        setAppointments(appointments.map((a) => (a.id === editingAppointment.id ? editingAppointment : a)))
        toast({
          title: "Appointment updated",
          description: "The appointment has been updated successfully",
        })
      } else {
        // Add new appointment
        const newAppointment = {
          ...editingAppointment,
          id: Math.max(...appointments.map((a) => a.id), 0) + 1,
        }
        setAppointments([...appointments, newAppointment])
        toast({
          title: "Appointment added",
          description: "The appointment has been added successfully",
        })
      }
      setEditingAppointment(null)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Appointments</h2>
        <Button
          onClick={() =>
            setEditingAppointment({
              customer: "",
              date: format(new Date(), "yyyy-MM-dd"),
              time: "10:00 AM",
              service: "Eye Test",
              status: "Scheduled",
              notes: "",
              contact: "",
            })
          }
          className="bg-red-500 hover:bg-red-600 text-white rounded-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Appointment
        </Button>
      </div>

      {/* Appointment Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search appointments..."
            className="pl-10 rounded-full"
            value={appointmentSearch}
            onChange={(e) => setAppointmentSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={appointmentFilter || ""} onValueChange={(value) => setAppointmentFilter(value || null)}>
            <SelectTrigger className="w-[180px] rounded-full">
              <div className="flex items-center">
                <Filter size={16} className="mr-2" />
                <span>{appointmentFilter || "All Statuses"}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Appointment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{appointments.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {appointments.filter((appointment) => appointment.status === "Scheduled").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {appointments.filter((appointment) => appointment.status === "Completed").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {editingAppointment ? (
        <div className="border rounded-xl p-6 mb-8 bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            {editingAppointment.id ? "Edit Appointment" : "Add New Appointment"}
          </h3>
          <form onSubmit={handleSaveAppointment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer">Customer Name*</Label>
                <Input
                  id="customer"
                  value={editingAppointment.customer}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, customer: e.target.value })}
                  required
                  className="rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="contact">Contact Number*</Label>
                <Input
                  id="contact"
                  value={editingAppointment.contact}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, contact: e.target.value })}
                  required
                  className="rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="date">Date*</Label>
                <Input
                  id="date"
                  type="date"
                  value={editingAppointment.date}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, date: e.target.value })}
                  required
                  className="rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="time">Time*</Label>
                <Input
                  id="time"
                  value={editingAppointment.time}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, time: e.target.value })}
                  required
                  className="rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="service">Service*</Label>
                <Select
                  value={editingAppointment.service}
                  onValueChange={(value) => setEditingAppointment({ ...editingAppointment, service: value })}
                >
                  <SelectTrigger className="rounded-lg">
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
              <div>
                <Label htmlFor="status">Status*</Label>
                <Select
                  value={editingAppointment.status}
                  onValueChange={(value) => setEditingAppointment({ ...editingAppointment, status: value })}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={editingAppointment.notes || ""}
                onChange={(e) => setEditingAppointment({ ...editingAppointment, notes: e.target.value })}
                className="rounded-lg"
                rows={3}
              />
            </div>

            <div className="pt-4 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingAppointment(null)}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white rounded-full">
                Save Appointment
              </Button>
            </div>
          </form>
        </div>
      ) : null}

      {filteredAppointments.length === 0 ? (
        <div className="text-center py-12 border rounded-xl">
          <p className="text-gray-500">No appointments found. Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.customer}</TableCell>
                  <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>{appointment.contact}</TableCell>
                  <TableCell>
                    <Badge
                      className={`rounded-full ${
                        appointment.status === "Completed"
                          ? "bg-green-500"
                          : appointment.status === "Scheduled"
                            ? "bg-blue-500"
                            : "bg-red-500"
                      }`}
                    >
                      {appointment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => handleEditAppointment(appointment)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 rounded-full"
                        onClick={() => handleDeleteAppointment(appointment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteAppointmentOpen} onOpenChange={setDeleteAppointmentOpen}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteAppointmentOpen(false)} className="rounded-full">
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteAppointment} className="rounded-full">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
