"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Users,
  BarChart3,
  Brain,
  Trophy,
  Clock,
  LogOut,
  MessageCircle,
  Loader2,
  Info,
  TrendingUp,
  Award,
  Target,
  Activity,
  Zap,
  Lightbulb,
  Settings,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock user data
const users = {
  students: [
    { id: 1, name: "Harshvardhan Mishra", email: "harsh@techshiksha.edu", password: "student123" },
    { id: 2, name: "Himanshu Pandey", email: "himanshu@techshiksha.edu", password: "student123" },
    { id: 3, name: "Jagriti Pandey", email: "jagriti@techshiksha.edu", password: "student123" },
    { id: 4, name: "Mahi Singh", email: "mahi@techshiksha.edu", password: "student123" },
    { id: 5, name: "Ashish Dubey", email: "ashish@techshiksha.edu", password: "student123" },
    { id: 6, name: "Ashwani Singh", email: "ashwani@techshiksha.edu", password: "student123" },
  ],
  teacher: { id: 7, name: "Dr. Anurag Shrivastava", email: "anurag@techshiksha.edu", password: "teacher123" },
  admin: { id: 8, name: "V.K Singh", email: "vk@techshiksha.edu", password: "admin123" },
}

const studentProgressData = [
  { week: "Week 1", mathematics: 65, science: 70, english: 75, hindi: 80 },
  { week: "Week 2", mathematics: 70, science: 75, english: 78, hindi: 82 },
  { week: "Week 3", mathematics: 75, science: 80, english: 80, hindi: 85 },
  { week: "Week 4", mathematics: 80, science: 85, english: 85, hindi: 88 },
  { week: "Week 5", mathematics: 85, science: 88, english: 87, hindi: 90 },
]

const quizScoreData = [
  { date: "Jan 1", score: 75 },
  { date: "Jan 8", score: 80 },
  { date: "Jan 15", score: 85 },
  { date: "Jan 22", score: 78 },
  { date: "Jan 29", score: 90 },
  { date: "Feb 5", score: 88 },
  { date: "Feb 12", score: 92 },
]

const classPerformanceData = [
  { student: "Harshvardhan", math: 85, science: 88, english: 82 },
  { student: "Himanshu", math: 78, science: 85, english: 90 },
  { student: "Jagriti", math: 92, science: 89, english: 87 },
  { student: "Mahi", math: 80, science: 82, english: 85 },
  { student: "Ashish", math: 75, science: 78, english: 80 },
  { student: "Ashwani", math: 88, science: 90, english: 85 },
]

const systemAnalyticsData = [
  { month: "Oct", students: 4, engagement: 75, completion: 68 },
  { month: "Nov", students: 5, engagement: 80, completion: 72 },
  { month: "Dec", students: 6, engagement: 85, completion: 78 },
  { month: "Jan", students: 6, engagement: 88, completion: 82 },
  { month: "Feb", students: 6, engagement: 90, completion: 85 },
]

const subjectDistribution = [
  { name: "Mathematics", value: 25, color: "#0088FE" },
  { name: "Science", value: 30, color: "#00C49F" },
  { name: "English", value: 20, color: "#FFBB28" },
  { name: "Hindi", value: 15, color: "#FF8042" },
  { name: "Others", value: 10, color: "#8884D8" },
]

export default function TechShikshaApp() {
  const [currentUser, setCurrentUser] = useState(null)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showCredentials, setShowCredentials] = useState(false)

  const [aiFeatures, setAiFeatures] = useState({
    studyPlan: null,
    quizGenerated: false,
    conceptExplanation: null,
    learningInsights: null,
  })

  const [teacherAiFeatures, setTeacherAiFeatures] = useState({
    studentAnalysis: null,
    curriculumSuggestions: null,
    performancePrediction: null,
    gradingInsights: null,
  })

  const [adminAiFeatures, setAdminAiFeatures] = useState({
    systemAnalytics: null,
    resourceOptimization: null,
    performanceForecast: null,
    engagementInsights: null,
  })

  const generateStudyPlan = async (subject) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Create a personalized 7-day study plan for ${subject} for a student. Include daily topics, practice exercises, and time allocation. Format it as a structured plan.`,
          type: "study_plan",
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setAiFeatures((prev) => ({ ...prev, studyPlan: data.response }))
      }
    } catch (error) {
      console.error("Study plan generation error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateQuiz = async (topic) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Generate 5 multiple choice questions on ${topic} with 4 options each and correct answers. Format as: Question 1: [question] A) option B) option C) option D) option. Correct Answer: [letter]`,
          type: "quiz_generation",
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setAiFeatures((prev) => ({ ...prev, quizGenerated: data.response }))
      }
    } catch (error) {
      console.error("Quiz generation error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const explainConcept = async (concept) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Explain the concept of "${concept}" in simple terms with examples, analogies, and practical applications. Make it easy to understand for students.`,
          type: "concept_explanation",
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setAiFeatures((prev) => ({ ...prev, conceptExplanation: data.response }))
      }
    } catch (error) {
      console.error("Concept explanation error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateInsights = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Based on a student's learning progress, provide personalized insights and recommendations for improvement. Include strengths, areas for improvement, and study strategies.`,
          type: "learning_insights",
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setAiFeatures((prev) => ({ ...prev, learningInsights: data.response }))
      }
    } catch (error) {
      console.error("Learning insights error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateStudentAnalysis = async (studentName) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Analyze student ${studentName}'s learning patterns, strengths, weaknesses, and provide personalized teaching recommendations. Include learning style assessment and improvement strategies.`,
          type: "student_analysis",
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setTeacherAiFeatures((prev) => ({ ...prev, studentAnalysis: data.response }))
      }
    } catch (error) {
      console.error("Student analysis error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateCurriculumSuggestions = async (subject) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Generate innovative curriculum suggestions for ${subject} including modern teaching methods, interactive activities, assessment strategies, and technology integration ideas.`,
          type: "curriculum_suggestions",
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setTeacherAiFeatures((prev) => ({ ...prev, curriculumSuggestions: data.response }))
      }
    } catch (error) {
      console.error("Curriculum suggestions error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generatePerformancePrediction = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Analyze class performance trends and predict future outcomes. Identify at-risk students, suggest intervention strategies, and recommend focus areas for improvement.`,
          type: "performance_prediction",
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setTeacherAiFeatures((prev) => ({ ...prev, performancePrediction: data.response }))
      }
    } catch (error) {
      console.error("Performance prediction error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateGradingInsights = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Provide AI-powered grading insights including rubric suggestions, common mistake patterns, feedback templates, and assessment optimization recommendations.`,
          type: "grading_insights",
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setTeacherAiFeatures((prev) => ({ ...prev, gradingInsights: data.response }))
      }
    } catch (error) {
      console.error("Grading insights error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateSystemAnalytics = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Generate comprehensive system analytics report including user engagement patterns, learning effectiveness metrics, system performance insights, and growth recommendations.`,
          type: "system_analytics",
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setAdminAiFeatures((prev) => ({ ...prev, systemAnalytics: data.response }))
      }
    } catch (error) {
      console.error("System analytics error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateResourceOptimization = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Analyze resource utilization and provide optimization recommendations for better efficiency, cost reduction, and improved learning outcomes. Include infrastructure and content suggestions.`,
          type: "resource_optimization",
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setAdminAiFeatures((prev) => ({ ...prev, resourceOptimization: data.response }))
      }
    } catch (error) {
      console.error("Resource optimization error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generatePerformanceForecast = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Create performance forecasts for the next quarter including enrollment predictions, engagement trends, success rate projections, and strategic recommendations.`,
          type: "performance_forecast",
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setAdminAiFeatures((prev) => ({ ...prev, performanceForecast: data.response }))
      }
    } catch (error) {
      console.error("Performance forecast error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateEngagementInsights = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Analyze user engagement patterns and provide insights on improving student retention, teacher satisfaction, and overall platform effectiveness.`,
          type: "engagement_insights",
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setAdminAiFeatures((prev) => ({ ...prev, engagementInsights: data.response }))
      }
    } catch (error) {
      console.error("Engagement insights error:", error)
    } finally {
      setIsLoading(false)
    }
  }

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
      alert("Invalid credentials. Please check your email and password.")
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <header className="text-center mb-16 relative">
            <div className="glassmorphism rounded-3xl p-12 mb-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-2xl animate-pulse-slow">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-6xl font-bold gradient-text">Tech Shiksha</h1>
              </div>
              <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                Revolutionizing Education with AI-Powered Learning
              </p>
              <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
                Affordable, Offline-First Learning for All - Empowering students with cutting-edge technology
              </p>
            </div>
          </header>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card className="group text-center hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:scale-105 hover:-translate-y-2">
              <CardHeader className="pb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-foreground mb-2">Student Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Interactive lessons, gamified quizzes, and AI-powered personalized learning paths
                </p>
              </CardContent>
            </Card>

            <Card className="group text-center hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:scale-105 hover:-translate-y-2">
              <CardHeader className="pb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <BarChart3 className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-foreground mb-2">Teacher Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Comprehensive dashboards with real-time progress tracking and detailed performance insights
                </p>
              </CardContent>
            </Card>

            <Card className="group text-center hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:scale-105 hover:-translate-y-2">
              <CardHeader className="pb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-foreground mb-2">AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Powered by Gemini 2.5 Flash for instant doubt resolution and adaptive learning support
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-card/90 backdrop-blur-lg rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-accent p-1">
              <div className="bg-card rounded-3xl">
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-3xl text-foreground mb-2">Access Tech Shiksha</CardTitle>
                  <CardDescription className="text-muted-foreground text-lg">
                    Choose your role and enter the future of learning
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="mb-8">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setShowCredentials(!showCredentials)}
                      className="w-full border-2 border-accent/20 hover:bg-accent/10 hover:border-accent/40 transition-all duration-300 text-lg py-6"
                    >
                      <Info className="w-5 h-5 mr-3" />
                      {showCredentials ? "Hide" : "Show"} Test Credentials
                    </Button>

                    {showCredentials && (
                      <div className="mt-4 p-4 bg-emerald-50 rounded-xl text-sm border border-emerald-200">
                        <p className="font-semibold mb-3 text-emerald-800">Test Credentials:</p>
                        <div className="space-y-2 text-emerald-700">
                          <p>
                            <strong>Students:</strong> harsh@techshiksha.edu, himanshu@techshiksha.edu,
                            jagriti@techshiksha.edu, mahi@techshiksha.edu, ashish@techshiksha.edu,
                            ashwani@techshiksha.edu / student123
                          </p>
                          <p>
                            <strong>Teacher:</strong> anurag@techshiksha.edu / teacher123
                          </p>
                          <p>
                            <strong>Admin:</strong> vk@techshiksha.edu / admin123
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Tabs defaultValue="student" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                      <TabsTrigger
                        value="student"
                        className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                      >
                        Student
                      </TabsTrigger>
                      <TabsTrigger
                        value="teacher"
                        className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                      >
                        Teacher
                      </TabsTrigger>
                      <TabsTrigger
                        value="admin"
                        className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                      >
                        Admin
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="student" className="space-y-4 mt-6">
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-800">Student Login</h3>
                        <p className="text-sm text-gray-600">Access your learning dashboard</p>
                      </div>
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                          <Label htmlFor="student-email" className="text-gray-700">
                            Email
                          </Label>
                          <Input
                            id="student-email"
                            type="email"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your student email"
                            className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="student-password" className="text-gray-700">
                            Password
                          </Label>
                          <Input
                            id="student-password"
                            type="password"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                            placeholder="Enter your password"
                            className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                        >
                          Login as Student
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="teacher" className="space-y-4 mt-6">
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-800">Teacher Login</h3>
                        <p className="text-sm text-gray-600">Access teacher dashboard</p>
                      </div>
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                          <Label htmlFor="teacher-email" className="text-gray-700">
                            Email
                          </Label>
                          <Input
                            id="teacher-email"
                            type="email"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your teacher email"
                            className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="teacher-password" className="text-gray-700">
                            Password
                          </Label>
                          <Input
                            id="teacher-password"
                            type="password"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                            placeholder="Enter your password"
                            className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                        >
                          Login as Teacher
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="admin" className="space-y-4 mt-6">
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-800">Admin Login</h3>
                        <p className="text-sm text-gray-600">Access admin portal</p>
                      </div>
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                          <Label htmlFor="admin-email" className="text-gray-700">
                            Email
                          </Label>
                          <Input
                            id="admin-email"
                            type="email"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your admin email"
                            className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="admin-password" className="text-gray-700">
                            Password
                          </Label>
                          <Input
                            id="admin-password"
                            type="password"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                            placeholder="Enter your password"
                            className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                        >
                          Login as Admin
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </div>
            </div>
          </Card>

          <div className="text-center mt-16">
            <Badge variant="secondary" className="mb-4 bg-emerald-100 text-emerald-800 border-emerald-200">
              Government Partnership Ready
            </Badge>
            <p className="text-gray-600">Designed for CSR initiatives and government education programs</p>
          </div>
        </div>
      </div>
    )
  }

  if (currentUser.role === "student") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Tech Shiksha
                </h1>
                <p className="text-sm text-gray-600">Welcome, {currentUser.name}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="lessons"
                className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
              >
                Lessons
              </TabsTrigger>
              <TabsTrigger
                value="quizzes"
                className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
              >
                Quizzes
              </TabsTrigger>
              <TabsTrigger
                value="chatbot"
                className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
              >
                AI Assistant
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-100">Lessons Completed</CardTitle>
                    <BookOpen className="h-5 w-5 text-blue-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">24/30</div>
                    <p className="text-xs text-blue-200">80% completion rate</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-emerald-100">Current Streak</CardTitle>
                    <Trophy className="h-5 w-5 text-emerald-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">7 days</div>
                    <p className="text-xs text-emerald-200">Keep it up!</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-purple-100">Time Spent</CardTitle>
                    <Clock className="h-5 w-5 text-purple-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">45h</div>
                    <p className="text-xs text-purple-200">This month</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-orange-100">Average Score</CardTitle>
                    <Award className="h-5 w-5 text-orange-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">85%</div>
                    <p className="text-xs text-orange-200">Last 10 quizzes</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                      Subject Progress Over Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={studentProgressData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                        <XAxis dataKey="week" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="mathematics"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="science"
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="english"
                          stroke="#f59e0b"
                          strokeWidth={3}
                          dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="hindi"
                          stroke="#ef4444"
                          strokeWidth={3}
                          dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                      <Target className="w-5 h-5 text-blue-600" />
                      Quiz Performance Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={quizScoreData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                        <XAxis dataKey="date" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="score"
                          stroke="#8b5cf6"
                          fill="url(#colorScore)"
                          strokeWidth={3}
                        />
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Activity className="w-5 h-5 text-green-600" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800">Completed Mathematics Quiz</p>
                        <p className="text-xs text-green-600">Score: 8/10 - 2 hours ago</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-300">Excellent</Badge>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-800">Watched Science Lesson: Photosynthesis</p>
                        <p className="text-xs text-blue-600">Yesterday</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-300">Completed</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lessons" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {["Mathematics", "Science", "English", "Hindi", "Social Studies", "Computer Science"].map((subject) => (
                  <Card key={subject} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-800">{subject}</CardTitle>
                      <CardDescription className="text-gray-600">Interactive lessons and practice</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-700">
                          <span>Progress</span>
                          <span>75%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full shadow-sm" style={{ width: "75%" }}></div>
                        </div>
                        <Button className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                          Continue Learning
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="quizzes" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Available Quizzes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {["Algebra Basics", "Plant Biology", "Grammar Rules", "Indian History"].map((quiz) => (
                      <div key={quiz} className="flex items-center justify-between p-4 border rounded-xl bg-gray-50">
                        <span className="font-medium text-gray-700">{quiz}</span>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                        >
                          Start Quiz
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Recent Scores</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "Mathematics Quiz", score: "8/10", date: "2 hours ago" },
                      { name: "Science Quiz", score: "9/10", date: "Yesterday" },
                      { name: "English Quiz", score: "7/10", date: "2 days ago" },
                    ].map((result) => (
                      <div
                        key={result.name}
                        className="flex items-center justify-between p-4 border rounded-xl bg-gray-50"
                      >
                        <div>
                          <p className="font-medium text-gray-700">{result.name}</p>
                          <p className="text-sm text-gray-600">{result.date}</p>
                        </div>
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-300">
                          {result.score}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="chatbot" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-800">
                      <BookOpen className="w-5 h-5" />
                      AI Study Planner
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => generateStudyPlan("Mathematics")}
                          className="bg-blue-600 hover:bg-blue-700 text-xs"
                          disabled={isLoading}
                        >
                          Math Plan
                        </Button>
                        <Button
                          onClick={() => generateStudyPlan("Science")}
                          className="bg-green-600 hover:bg-green-700 text-xs"
                          disabled={isLoading}
                        >
                          Science Plan
                        </Button>
                        <Button
                          onClick={() => generateStudyPlan("English")}
                          className="bg-purple-600 hover:bg-purple-700 text-xs"
                          disabled={isLoading}
                        >
                          English Plan
                        </Button>
                      </div>
                      {aiFeatures.studyPlan && (
                        <div className="bg-white p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-xs">{aiFeatures.studyPlan}</pre>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <Zap className="w-5 h-5" />
                      AI Quiz Generator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => generateQuiz("Algebra")}
                          className="bg-green-600 hover:bg-green-700 text-xs"
                          disabled={isLoading}
                        >
                          Algebra Quiz
                        </Button>
                        <Button
                          onClick={() => generateQuiz("Physics")}
                          className="bg-blue-600 hover:bg-blue-700 text-xs"
                          disabled={isLoading}
                        >
                          Physics Quiz
                        </Button>
                      </div>
                      {aiFeatures.quizGenerated && (
                        <div className="bg-white p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-xs">{aiFeatures.quizGenerated}</pre>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-800">
                      <Lightbulb className="w-5 h-5" />
                      Concept Explainer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => explainConcept("Photosynthesis")}
                          className="bg-purple-600 hover:bg-purple-700 text-xs"
                          disabled={isLoading}
                        >
                          Photosynthesis
                        </Button>
                        <Button
                          onClick={() => explainConcept("Gravity")}
                          className="bg-indigo-600 hover:bg-indigo-700 text-xs"
                          disabled={isLoading}
                        >
                          Gravity
                        </Button>
                      </div>
                      {aiFeatures.conceptExplanation && (
                        <div className="bg-white p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-xs">{aiFeatures.conceptExplanation}</pre>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-red-100 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-800">
                      <TrendingUp className="w-5 h-5" />
                      Learning Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button
                        onClick={generateInsights}
                        className="bg-orange-600 hover:bg-orange-700 text-sm w-full"
                        disabled={isLoading}
                      >
                        Generate AI Insights
                      </Button>
                      {aiFeatures.learningInsights && (
                        <div className="bg-white p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-xs">{aiFeatures.learningInsights}</pre>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Brain className="w-5 h-5 text-purple-600" />
                    AI Learning Assistant
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Powered by Gemini 2.5 Flash - Ask questions in Hindi, English, or Punjabi
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-96 border rounded-xl p-4 overflow-y-auto bg-gradient-to-br from-gray-50 to-blue-50">
                      {chatMessages.length === 0 ? (
                        <div className="text-center text-gray-500 mt-20">
                          <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium">Start a conversation with your AI assistant!</p>
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
                                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                                  message.role === "user"
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                                    : "bg-white border border-gray-200"
                                }`}
                              >
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              </div>
                            </div>
                          ))}
                          {isLoading && (
                            <div className="flex justify-start">
                              <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl flex items-center gap-2 shadow-sm">
                                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                                <p className="text-sm text-gray-600">AI is thinking...</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleChatSubmit} className="flex gap-3">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask me anything about your studies..."
                        className="flex-1 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                        disabled={isLoading}
                      />
                      <Button
                        type="submit"
                        disabled={isLoading || !chatInput.trim()}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl px-6"
                      >
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Tech Shiksha - Teacher Portal
                </h1>
                <p className="text-sm text-gray-600">Welcome, {currentUser.name}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
              >
                Class Overview
              </TabsTrigger>
              <TabsTrigger
                value="students"
                className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
              >
                Student Progress
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
              >
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-100">Total Students</CardTitle>
                    <Users className="h-5 w-5 text-blue-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{users.students.length}</div>
                    <p className="text-xs text-blue-200">Active learners</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-emerald-100">Active Today</CardTitle>
                    <Clock className="h-5 w-5 text-emerald-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">5</div>
                    <p className="text-xs text-emerald-200">Students online</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-purple-100">Avg. Completion</CardTitle>
                    <BarChart3 className="h-5 w-5 text-purple-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">78%</div>
                    <p className="text-xs text-purple-200">Class average</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-orange-100">Assignments Due</CardTitle>
                    <BookOpen className="h-5 w-5 text-orange-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">3</div>
                    <p className="text-xs text-orange-200">This week</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    Class Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={classPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                      <XAxis dataKey="student" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="math" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="science" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="english" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Activity className="w-5 h-5 text-green-600" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.students.slice(0, 4).map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 border rounded-xl bg-gray-50"
                      >
                        <div>
                          <h3 className="font-medium text-gray-700">{student.name}</h3>
                          <p className="text-sm text-gray-600">Completed Mathematics Quiz - Score: 8/10</p>
                        </div>
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-300">
                          2h ago
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-800">
                      <Brain className="w-5 h-5" />
                      AI Student Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={() => generateStudentAnalysis("Harshvardhan")}
                          className="bg-blue-600 hover:bg-blue-700 text-xs"
                          disabled={isLoading}
                        >
                          Analyze Harsh
                        </Button>
                        <Button
                          onClick={() => generateStudentAnalysis("Himanshu")}
                          className="bg-indigo-600 hover:bg-indigo-700 text-xs"
                          disabled={isLoading}
                        >
                          Analyze Himanshu
                        </Button>
                        <Button
                          onClick={() => generateStudentAnalysis("Jagriti")}
                          className="bg-purple-600 hover:bg-purple-700 text-xs"
                          disabled={isLoading}
                        >
                          Analyze Jagriti
                        </Button>
                        <Button
                          onClick={() => generateStudentAnalysis("Mahi")}
                          className="bg-pink-600 hover:bg-pink-700 text-xs"
                          disabled={isLoading}
                        >
                          Analyze Mahi
                        </Button>
                      </div>
                      {teacherAiFeatures.studentAnalysis && (
                        <div className="bg-white p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-xs">{teacherAiFeatures.studentAnalysis}</pre>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <Lightbulb className="w-5 h-5" />
                      AI Curriculum Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => generateCurriculumSuggestions("Mathematics")}
                          className="bg-green-600 hover:bg-green-700 text-xs"
                          disabled={isLoading}
                        >
                          Math Curriculum
                        </Button>
                        <Button
                          onClick={() => generateCurriculumSuggestions("Science")}
                          className="bg-teal-600 hover:bg-teal-700 text-xs"
                          disabled={isLoading}
                        >
                          Science Curriculum
                        </Button>
                      </div>
                      {teacherAiFeatures.curriculumSuggestions && (
                        <div className="bg-white p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-xs">{teacherAiFeatures.curriculumSuggestions}</pre>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-800">
                      <TrendingUp className="w-5 h-5" />
                      Performance Prediction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button
                        onClick={generatePerformancePrediction}
                        className="bg-purple-600 hover:bg-purple-700 text-sm w-full"
                        disabled={isLoading}
                      >
                        Generate AI Predictions
                      </Button>
                      {teacherAiFeatures.performancePrediction && (
                        <div className="bg-white p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-xs">{teacherAiFeatures.performancePrediction}</pre>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-red-100 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-800">
                      <Award className="w-5 h-5" />
                      AI Grading Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button
                        onClick={generateGradingInsights}
                        className="bg-orange-600 hover:bg-orange-700 text-sm w-full"
                        disabled={isLoading}
                      >
                        Get Grading Insights
                      </Button>
                      {teacherAiFeatures.gradingInsights && (
                        <div className="bg-white p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-xs">{teacherAiFeatures.gradingInsights}</pre>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-800">Student Progress Tracking</CardTitle>
                  <CardDescription className="text-gray-600">
                    Monitor individual student performance and engagement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.students.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 border rounded-xl bg-gray-50"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-700">{student.name}</h3>
                          <p className="text-sm text-gray-600">{student.email}</p>
                          <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1 text-gray-700">
                              <span>Overall Progress</span>
                              <span>{Math.floor(Math.random() * 30) + 70}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-emerald-500 h-2 rounded-full shadow-sm"
                                style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                            Active
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">Last seen: 2h ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-800">
                      <Brain className="w-5 h-5" />
                      AI System Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button
                        onClick={generateSystemAnalytics}
                        className="bg-blue-600 hover:bg-blue-700 text-sm w-full"
                        disabled={isLoading}
                      >
                        Generate System Report
                      </Button>
                      {adminAiFeatures.systemAnalytics && (
                        <div className="bg-white p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-xs">{adminAiFeatures.systemAnalytics}</pre>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <Settings className="w-5 h-5" />
                      Resource Optimization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button
                        onClick={generateResourceOptimization}
                        className="bg-green-600 hover:bg-green-700 text-sm w-full"
                        disabled={isLoading}
                      >
                        Optimize Resources
                      </Button>
                      {adminAiFeatures.resourceOptimization && (
                        <div className="bg-white p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-xs">{adminAiFeatures.resourceOptimization}</pre>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-800">
                      <TrendingUp className="w-5 h-5" />
                      Performance Forecast
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button
                        onClick={generatePerformanceForecast}
                        className="bg-purple-600 hover:bg-purple-700 text-sm w-full"
                        disabled={isLoading}
                      >
                        Generate Forecast
                      </Button>
                      {adminAiFeatures.performanceForecast && (
                        <div className="bg-white p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-xs">{adminAiFeatures.performanceForecast}</pre>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-red-100 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-800">
                      <Users className="w-5 h-5" />
                      Engagement Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button
                        onClick={generateEngagementInsights}
                        className="bg-orange-600 hover:bg-orange-700 text-sm w-full"
                        disabled={isLoading}
                      >
                        Analyze Engagement
                      </Button>
                      {adminAiFeatures.engagementInsights && (
                        <div className="bg-white p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-xs">{adminAiFeatures.engagementInsights}</pre>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    Platform Usage Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={systemAnalyticsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="engagement"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="completion"
                        stroke="#06b6d4"
                        strokeWidth={3}
                        dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Target className="w-5 h-5 text-orange-600" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">Student Engagement</span>
                        <span className="text-emerald-600 font-semibold">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full shadow-sm"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">Course Completion Rate</span>
                        <span className="text-blue-600 font-semibold">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full shadow-sm"
                          style={{ width: "78%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">AI Assistant Usage</span>
                        <span className="text-purple-600 font-semibold">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full shadow-sm"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  if (currentUser.role === "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-stone-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-stone-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Tech Shiksha - Admin Portal
                </h1>
                <p className="text-sm text-gray-600">Welcome, {currentUser.name}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <Tabs defaultValue="system" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="system" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                System Overview
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                User Management
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
              >
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="system" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Activity className="w-5 h-5 text-emerald-600" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="font-medium text-gray-700">Raspberry Pi Servers</span>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
                          Online
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="font-medium text-gray-700">Database Connection</span>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
                          Connected
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="font-medium text-gray-700">AI Chatbot Service</span>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
                          Active
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                          <span className="font-medium text-gray-700">SMS Gateway</span>
                        </div>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                          Maintenance
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Recent Activities</h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        <div className="flex items-center justify-between p-2 border rounded bg-blue-50">
                          <span className="text-sm text-gray-700">System backup completed</span>
                          <span className="text-xs text-gray-500">5 min ago</span>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded bg-green-50">
                          <span className="text-sm text-gray-700">AI model updated successfully</span>
                          <span className="text-xs text-gray-500">15 min ago</span>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded bg-purple-50">
                          <span className="text-sm text-gray-700">New user registration: Ashish</span>
                          <span className="text-xs text-gray-500">1h ago</span>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded bg-orange-50">
                          <span className="text-sm text-gray-700">Database optimization completed</span>
                          <span className="text-xs text-gray-500">2h ago</span>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded bg-red-50">
                          <span className="text-sm text-gray-700">SMS Gateway maintenance started</span>
                          <span className="text-xs text-gray-500">3h ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-100">Total Users</CardTitle>
                    <Users className="h-5 w-5 text-blue-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{users.students.length + 2}</div>
                    <p className="text-xs text-blue-200">Registered users</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-emerald-100">Active Today</CardTitle>
                    <Clock className="h-5 w-5 text-emerald-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">12</div>
                    <p className="text-xs text-emerald-200">Users online</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-purple-100">Avg. Session</CardTitle>
                    <Clock className="h-5 w-5 text-purple-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">28m</div>
                    <p className="text-xs text-purple-200">Per user</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-orange-100">System Uptime</CardTitle>
                    <Activity className="h-5 w-5 text-orange-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">99.9%</div>
                    <p className="text-xs text-orange-200">Last 24 hours</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-800">
                      <Brain className="w-5 h-5" />
                      AI System Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button
                        onClick={generateSystemAnalytics}
                        className="bg-blue-600 hover:bg-blue-700 text-sm w-full"
                        disabled={isLoading}
                      >
                        Generate System Report
                      </Button>
                      {adminAiFeatures.systemAnalytics && (
                        <div className="bg-white p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-xs">{adminAiFeatures.systemAnalytics}</pre>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <Settings className="w-5 h-5" />
                      Resource Optimization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button
                        onClick={generateResourceOptimization}
                        className="bg-green-600 hover:bg-green-700 text-sm w-full"
                        disabled={isLoading}
                      >
                        Optimize Resources
                      </Button>
                      {adminAiFeatures.resourceOptimization && (
                        <div className="bg-white p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-xs">{adminAiFeatures.resourceOptimization}</pre>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-800">
                      <TrendingUp className="w-5 h-5" />
                      Performance Forecast
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button
                        onClick={generatePerformanceForecast}
                        className="bg-purple-600 hover:bg-purple-700 text-sm w-full"
                        disabled={isLoading}
                      >
                        Generate Forecast
                      </Button>
                      {adminAiFeatures.performanceForecast && (
                        <div className="bg-white p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-xs">{adminAiFeatures.performanceForecast}</pre>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-red-100 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-800">
                      <Users className="w-5 h-5" />
                      Engagement Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button
                        onClick={generateEngagementInsights}
                        className="bg-orange-600 hover:bg-orange-700 text-sm w-full"
                        disabled={isLoading}
                      >
                        Analyze Engagement
                      </Button>
                      {adminAiFeatures.engagementInsights && (
                        <div className="bg-white p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-xs">{adminAiFeatures.engagementInsights}</pre>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    Subject Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={subjectDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {subjectDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    Platform Usage Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={systemAnalyticsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="engagement"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="completion"
                        stroke="#06b6d4"
                        strokeWidth={3}
                        dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-800">User Management</CardTitle>
                  <CardDescription className="text-gray-600">
                    Manage and monitor user accounts and roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(users).map(([role, user]) => (
                      <div key={role}>
                        <h3 className="font-semibold text-gray-700 capitalize">{role}</h3>
                        {Array.isArray(user) ? (
                          user.map((u) => (
                            <div
                              key={u.id}
                              className="flex items-center justify-between p-4 border rounded-xl bg-gray-50"
                            >
                              <div>
                                <h3 className="font-medium text-gray-700">{u.name}</h3>
                                <p className="text-sm text-gray-600">{u.email}</p>
                              </div>
                              <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                                Active
                              </Badge>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-center justify-between p-4 border rounded-xl bg-gray-50">
                            <div>
                              <h3 className="font-medium text-gray-700">{user.name}</h3>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                            <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                              Active
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                      Platform Usage Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={systemAnalyticsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="engagement"
                          stroke="#8b5cf6"
                          strokeWidth={3}
                          dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="completion"
                          stroke="#06b6d4"
                          strokeWidth={3}
                          dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                      <Target className="w-5 h-5 text-orange-600" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-gray-700">Student Engagement</span>
                          <span className="text-emerald-600 font-semibold">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full shadow-sm"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-gray-700">Course Completion Rate</span>
                          <span className="text-blue-600 font-semibold">78%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full shadow-sm"
                            style={{ width: "78%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-gray-700">AI Assistant Usage</span>
                          <span className="text-purple-600 font-semibold">92%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full shadow-sm"
                            style={{ width: "92%" }}
                          ></div>
                        </div>
                      </div>
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
}
