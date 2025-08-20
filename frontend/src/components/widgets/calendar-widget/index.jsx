"use client"

import { useState } from "react"
import { Card, Calendar, Badge, Button, Modal, List } from "antd"
import { CalendarOutlined, ClockCircleOutlined, UserOutlined } from "@ant-design/icons"
import dayjs from "dayjs"

const CalendarWidget = ({ title = "Planning Formations", events = [], onEventClick, onDateSelect, compact = false, loading = false }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [showEventsModal, setShowEventsModal] = useState(false)
  const [selectedDateEvents, setSelectedDateEvents] = useState([])

  const getEventsForDate = (date) => events.filter((event) => dayjs(event.date).format("YYYY-MM-DD") === date.format("YYYY-MM-DD"))

  const dateCellRender = (value) => {
    const dayEvents = getEventsForDate(value)
    if (dayEvents.length === 0) return null
    return (
      <div className="space-y-1">
        {dayEvents.slice(0, compact ? 1 : 2).map((event, index) => (
          <Badge key={index} status={event.type === "formation" ? "processing" : "success"} text={<span className="text-xs truncate block">{event.title}</span>} />
        ))}
        {dayEvents.length > (compact ? 1 : 2) && <div className="text-xs text-gray-500">+{dayEvents.length - (compact ? 1 : 2)} autres</div>}
      </div>
    )
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    const dayEvents = getEventsForDate(date)
    if (dayEvents.length > 0) {
      setSelectedDateEvents(dayEvents)
      setShowEventsModal(true)
    }
    if (onDateSelect) onDateSelect(date, dayEvents)
  }

  const getEventTypeColor = (type) => ({ formation: "blue", reunion: "green", evaluation: "orange", deadline: "red" }[type] || "default")

  return (
    <>
      <Card
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CalendarOutlined className="text-blue-600" />
              <span>{title}</span>
            </div>
            <div className="text-sm text-gray-500">{events.length} événements</div>
          </div>
        }
        className="h-full shadow-lg hover:shadow-xl transition-all duration-300"
        loading={loading}
      >
        <div className="space-y-4">
          <Calendar fullscreen={false} value={selectedDate} onSelect={handleDateSelect} dateCellRender={dateCellRender} className="border-0" />

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <ClockCircleOutlined className="mr-2" />
              Aujourd'hui ({dayjs().format("DD/MM/YYYY")})
            </h4>
            {getEventsForDate(dayjs()).length > 0 ? (
              <div className="space-y-2">
                {getEventsForDate(dayjs())
                  .slice(0, 3)
                  .map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors" onClick={() => onEventClick && onEventClick(event)}>
                      <div className="flex items-center space-x-2">
                        <Badge status={getEventTypeColor(event.type)} />
                        <span className="text-sm font-medium">{event.title}</span>
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <ClockCircleOutlined className="mr-1" />
                        {event.time}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500 text-center py-4">Aucun événement aujourd'hui</div>
            )}
          </div>
        </div>
      </Card>

      <Modal title={`Événements du ${selectedDate.format("DD/MM/YYYY")}`} open={showEventsModal} onCancel={() => setShowEventsModal(false)} footer={null} width={600}>
        <List
          dataSource={selectedDateEvents}
          renderItem={(event) => (
            <List.Item key={event.title}>
              <List.Item.Meta
                avatar={<Badge status={getEventTypeColor(event.type)} />}
                title={
                  <div className="flex items-center justify-between">
                    <span>{event.title}</span>
                    <span className="text-sm text-gray-500">{event.time}</span>
                  </div>
                }
                description={
                  <div className="space-y-1">
                    <div>{event.description}</div>
                    {event.participants && (
                      <div className="flex items-center text-sm text-gray-500">
                        <UserOutlined className="mr-1" />
                        {event.participants} participants
                      </div>
                    )}
                  </div>
                }
              />
              <List.Item actions={[<Button key="view-details" type="link" size="small" onClick={() => onEventClick && onEventClick(event)}>
                Voir détails
              </Button>]} />
            </List.Item>
          )}
        />
      </Modal>
    </>
  )
}

export default CalendarWidget


