"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, BarChart3, Brain, Trophy, Clock, LogOut, MessageCircle, Loader2 } from "lucide-react"

// Mock user data
const users = {
  students: [
    { id: 1, name: "Harshvardhan Mishra", email: "harshvardhan@techshiksha.edu", password: "student123" },
    { id: 2, name: "Himanshu Pandey", email: "himanshu@techshiksha.edu", password: "student123" },
    { id: 3, name: "Jagriti Pandey", email: "jagriti@techshiksha.edu", password: "student123" },
    { id: 4, name: "Mahi Singh", email: "mahi@techshiksha.edu", password: "student123" },
    { id: 5, name: "Ashish Dubey", email: "ashish@techshiksha.edu", password: "student123" },
    { id: 6, name: "Ashwani Singh", email: "ashwani@techshiksha.edu", password: "student123" },
  ],
  teacher: { id: 7, name: "Dr. Anurag Shrivastava", email: "anurag@techshiksha.edu", password: "teacher123" },
  admin: { id: 8, name: "V.K Singh", email: "vk@techshiksha.edu", password: "admin123" },
}

export default function TechShikshaApp() {
  const [currentUser, setCurrentUser] = useState(null)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()

    const allUsers = [
      ...users.students.map((u) => ({ ...u, role: "student" })),
      { ...users.teacher, role: "teacher" },
      { ...users.admin, role: "admin" },
    ]

    const user = allUsers.find((u) => u.email === loginForm.email && u.password === loginForm.password)

    if (user) {
      setCurrentUser(user)
    } else {
      alert("Invalid credentials")
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setLoginForm({ email: "", password: "" })
    setChatMessages([])
  }

  const handleChatSubmit = async (e) => {
    e.preventDefault()
    if (!chatInput.trim() || isLoading) return

    const userMessage = { role: "user", content: chatInput }
    setChatMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: chatInput }),
      })

      const data = await response.json()

      if (response.ok) {
        const aiResponse = {
          role: "assistant",
          content: data.response,
        }
        setChatMessages((prev) => [...prev, aiResponse])
      } else {
        const errorResponse = {
          role: "assistant",
          content: `Sorry, I encountered an error: ${data.error}. Please make sure your Google AI API key is configured in the environment variables.`,
        }
        setChatMessages((prev) => [...prev, errorResponse])
      }
    } catch (error) {
      console.error("Chat error:", error)
      const errorResponse = {
        role: "assistant",
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
      }
      setChatMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }

    setChatInput("")
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold text-primary">Tech Shiksha</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Affordable, Offline-First Learning for All - Empowering students with AI-driven education
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>Student App</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Interactive lessons, quizzes, and AI-powered doubt solving</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>Teacher Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Monitor student progress and generate detailed reports</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Brain className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Powered by Gemini 2.5 Flash for personalized learning</p>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Login to Tech Shiksha</CardTitle>
              <CardDescription>Choose your role and enter your credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="student" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="teacher">Teacher</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>

                <TabsContent value="student" className="space-y-4 mt-6">
                  <div className="text-center mb-4">
                    <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Student Login</h3>
                    <p className="text-sm text-muted-foreground">Access your learning dashboard</p>
                  </div>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="student-email">Email</Label>
                      <Input
                        id="student-email"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your student email"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="student-password">Password</Label>
                      <Input
                        id="student-password"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Login as Student
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="teacher" className="space-y-4 mt-6">
                  <div className="text-center mb-4">
                    <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Teacher Login</h3>
                    <p className="text-sm text-muted-foreground">Access teacher dashboard</p>
                  </div>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="teacher-email">Email</Label>
                      <Input
                        id="teacher-email"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your teacher email"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="teacher-password">Password</Label>
                      <Input
                        id="teacher-password"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Login as Teacher
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="admin" className="space-y-4 mt-6">
                  <div className="text-center mb-4">
                    <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Admin Login</h3>
                    <p className="text-sm text-muted-foreground">Access admin portal</p>
                  </div>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="admin-email">Email</Label>
                      <Input
                        id="admin-email"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your admin email"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="admin-password">Password</Label>
                      <Input
                        id="admin-password"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Login as Admin
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Badge variant="secondary" className="mb-4">
              Government Partnership Ready
            </Badge>
            <p className="text-muted-foreground">Designed for CSR initiatives and government education programs</p>
          </div>
        </div>
      </div>
    )
  }

  if (currentUser.role === "student") {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Tech Shiksha</h1>
                <p className="text-sm text-muted-foreground">Welcome, {currentUser.name}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
              <TabsTrigger value="chatbot">AI Assistant</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24/30</div>
                    <p className="text-xs text-muted-foreground">80% completion rate</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7 days</div>
                    <p className="text-xs text-muted-foreground">Keep it up!</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45h</div>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Completed Mathematics Quiz</p>
                        <p className="text-xs text-muted-foreground">Score: 8/10 - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Watched Science Lesson: Photosynthesis</p>
                        <p className="text-xs text-muted-foreground">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lessons" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {["Mathematics", "Science", "English", "Hindi", "Social Studies", "Computer Science"].map((subject) => (
                  <Card key={subject}>
                    <CardHeader>
                      <CardTitle className="text-lg">{subject}</CardTitle>
                      <CardDescription>Interactive lessons and practice</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>75%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                        <Button className="w-full mt-4">Continue Learning</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="quizzes" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Quizzes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {["Algebra Basics", "Plant Biology", "Grammar Rules", "Indian History"].map((quiz) => (
                      <div key={quiz} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">{quiz}</span>
                        <Button size="sm">Start Quiz</Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Scores</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "Mathematics Quiz", score: "8/10", date: "2 hours ago" },
                      { name: "Science Quiz", score: "9/10", date: "Yesterday" },
                      { name: "English Quiz", score: "7/10", date: "2 days ago" },
                    ].map((result) => (
                      <div key={result.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{result.name}</p>
                          <p className="text-sm text-muted-foreground">{result.date}</p>
                        </div>
                        <Badge variant="secondary">{result.score}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="chatbot" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Learning Assistant
                  </CardTitle>
                  <CardDescription>
                    Powered by Gemini 2.5 Flash - Ask questions in Hindi, English, or Punjabi
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-96 border rounded-lg p-4 overflow-y-auto bg-muted/30">
                      {chatMessages.length === 0 ? (
                        <div className="text-center text-muted-foreground mt-20">
                          <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>Start a conversation with your AI assistant!</p>
                          <p className="text-sm mt-2">Ask about any subject or concept you're learning.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {chatMessages.map((message, index) => (
                            <div
                              key={index}
                              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border"
                                }`}
                              >
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              </div>
                            </div>
                          ))}
                          {isLoading && (
                            <div className="flex justify-start">
                              <div className="bg-card border px-4 py-2 rounded-lg flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <p className="text-sm text-muted-foreground">AI is thinking...</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleChatSubmit} className="flex gap-2">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask me anything about your studies..."
                        className="flex-1"
                        disabled={isLoading}
                      />
                      <Button type="submit" disabled={isLoading || !chatInput.trim()}>
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send"}
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  if (currentUser.role === "teacher") {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Tech Shiksha - Teacher Portal</h1>
                <p className="text-sm text-muted-foreground">Welcome, {currentUser.name}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Class Overview</TabsTrigger>
              <TabsTrigger value="students">Student Progress</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{users.students.length}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Today</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">78%</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Assignments Due</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.students.slice(0, 4).map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">Completed Mathematics Quiz - Score: 8/10</p>
                        </div>
                        <Badge variant="secondary">2h ago</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Progress Tracking</CardTitle>
                  <CardDescription>Monitor individual student performance and engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.students.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                          <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Overall Progress</span>
                              <span>{Math.floor(Math.random() * 30) + 70}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">Active</Badge>
                          <p className="text-sm text-muted-foreground mt-1">Last seen: 2h ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                      <p className="text-muted-foreground">Chart: Student performance over time</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Subject-wise Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["Mathematics", "Science", "English", "Hindi"].map((subject) => (
                        <div key={subject}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{subject}</span>
                            <span>{Math.floor(Math.random() * 20) + 75}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${Math.floor(Math.random() * 20) + 75}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  if (currentUser.role === "admin") {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Tech Shiksha - Admin Portal</h1>
                <p className="text-sm text-muted-foreground">Welcome, {currentUser.name}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="analytics">System Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{users.students.length}</div>
                    <p className="text-xs text-muted-foreground">+2 from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1</div>
                    <p className="text-xs text-muted-foreground">Dr. Anurag Shrivastava</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">99.9%</div>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">85%</div>
                    <p className="text-xs text-muted-foreground">Daily active users</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent System Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">New student registration: Ashwani Singh</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">System backup completed successfully</p>
                          <p className="text-xs text-muted-foreground">6 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Teacher report generated</p>
                          <p className="text-xs text-muted-foreground">Yesterday</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hardware Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Raspberry Pi Server</span>
                        <Badge variant="secondary">Online</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Database Server</span>
                        <Badge variant="secondary">Online</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">AI Service (Gemini)</span>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Backup System</span>
                        <Badge variant="secondary">Healthy</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Students ({users.students.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {users.students.map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                          <Badge variant="outline">Active</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Staff</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{users.teacher.name}</p>
                          <p className="text-sm text-muted-foreground">{users.teacher.email}</p>
                        </div>
                        <Badge>Teacher</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{users.admin.name}</p>
                          <p className="text-sm text-muted-foreground">{users.admin.email}</p>
                        </div>
                        <Badge variant="secondary">Admin</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                      <p className="text-muted-foreground">Chart: Platform usage analytics</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Student Engagement</span>
                          <span>85%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Course Completion Rate</span>
                          <span>78%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-secondary h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>AI Assistant Usage</span>
                          <span>92%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-accent h-2 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Reports</CardTitle>
                  <CardDescription>
                    Create detailed reports for stakeholders and government partnerships
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button className="h-20 flex-col">
                      <BarChart3 className="w-6 h-6 mb-2" />
                      Student Progress Report
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <Users className="w-6 h-6 mb-2" />
                      Teacher Performance Report
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <Trophy className="w-6 h-6 mb-2" />
                      System Usage Analytics
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <BookOpen className="w-6 h-6 mb-2" />
                      Curriculum Effectiveness
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  return null
}
