"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Sparkles, Wand2, RefreshCw, Lightbulb } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface OptimizationOptions {
  tone: string
  style: string
  length: string
  aiTool: string
}

export default function PromptOptimizer() {
  const [originalPrompt, setOriginalPrompt] = useState("")
  const [options, setOptions] = useState<OptimizationOptions>({
    tone: "professional",
    style: "detailed",
    length: "medium",
    aiTool: "chatgpt",
  })
  const [optimizedPrompts, setOptimizedPrompts] = useState<string[]>([])
  const [isOptimizing, setIsOptimizing] = useState(false)
  const { toast } = useToast()

  const toneOptions = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "creative", label: "Creative" },
    { value: "technical", label: "Technical" },
    { value: "friendly", label: "Friendly" },
    { value: "authoritative", label: "Authoritative" },
  ]

  const styleOptions = [
    { value: "detailed", label: "Detailed" },
    { value: "concise", label: "Concise" },
    { value: "step-by-step", label: "Step-by-step" },
    { value: "conversational", label: "Conversational" },
    { value: "structured", label: "Structured" },
    { value: "creative", label: "Creative" },
  ]

  const lengthOptions = [
    { value: "short", label: "Short" },
    { value: "medium", label: "Medium" },
    { value: "long", label: "Long" },
    { value: "comprehensive", label: "Comprehensive" },
  ]

  const aiToolOptions = [
    { value: "chatgpt", label: "ChatGPT", icon: "🤖" },
    { value: "midjourney", label: "MidJourney", icon: "🎨" },
    { value: "dalle", label: "DALL·E", icon: "🖼️" },
    { value: "claude", label: "Claude", icon: "💭" },
    { value: "gemini", label: "Gemini", icon: "✨" },
  ]

  const optimizePrompt = () => {
    if (!originalPrompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Add your original prompt to get optimization suggestions.",
        variant: "destructive",
      })
      return
    }

    setIsOptimizing(true)

    // Simulate optimization process
    setTimeout(() => {
      const optimized = generateOptimizedPrompts(originalPrompt, options)
      setOptimizedPrompts(optimized)
      setIsOptimizing(false)
    }, 1500)
  }

  const generateOptimizedPrompts = (prompt: string, opts: OptimizationOptions): string[] => {
    const prompts: string[] = []

    if (opts.aiTool === "chatgpt" || opts.aiTool === "claude" || opts.aiTool === "gemini") {
      // Text-based AI optimization
      let optimized = prompt

      // Add context and role
      if (opts.tone === "professional") {
        optimized = `As an expert in this field, ${optimized.toLowerCase()}`
      } else if (opts.tone === "creative") {
        optimized = `Think creatively and imaginatively: ${optimized}`
      }

      // Add structure based on style
      if (opts.style === "step-by-step") {
        optimized += ". Please provide a step-by-step approach."
      } else if (opts.style === "detailed") {
        optimized += ". Please provide comprehensive details and examples."
      }

      // Add length specification
      if (opts.length === "short") {
        optimized += " Keep the response concise and to the point."
      } else if (opts.length === "comprehensive") {
        optimized += " Provide an in-depth, comprehensive response covering all aspects."
      }

      prompts.push(optimized)

      // Alternative version with different structure
      prompts.push(`Context: You are a helpful assistant specializing in this topic.

Task: ${prompt}

Requirements:
- Tone: ${opts.tone}
- Style: ${opts.style}
- Length: ${opts.length}

Please provide a well-structured response.`)

      // Third version with specific formatting
      prompts.push(`${prompt}

Please format your response with:
1. Clear headings
2. Bullet points where appropriate
3. Examples when relevant
4. A ${opts.tone} tone throughout`)
    } else if (opts.aiTool === "midjourney") {
      // Image generation optimization
      let basePrompt = prompt

      // Add artistic style
      if (opts.style === "detailed") {
        basePrompt += ", highly detailed, intricate details"
      } else if (opts.style === "creative") {
        basePrompt += ", artistic, creative composition"
      }

      // Add quality parameters
      prompts.push(`${basePrompt}, professional photography, high quality, 8k resolution --ar 16:9 --v 6`)
      prompts.push(`${basePrompt}, digital art, concept art style, trending on artstation --ar 1:1 --stylize 750`)
      prompts.push(`${basePrompt}, cinematic lighting, dramatic composition, photorealistic --ar 3:2 --chaos 25`)
    } else if (opts.aiTool === "dalle") {
      // DALL·E optimization
      const basePrompt = prompt

      prompts.push(`${basePrompt}, digital art, high quality, detailed`)
      prompts.push(`A ${opts.style} illustration of ${basePrompt}, professional artwork`)
      prompts.push(`${basePrompt}, photorealistic style, studio lighting, high resolution`)
    }

    return prompts
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The optimized prompt has been copied to your clipboard.",
    })
  }

  const tips = {
    chatgpt: [
      "Be specific about the role you want ChatGPT to play",
      "Use clear, structured instructions",
      "Provide examples when possible",
      "Specify the desired output format",
    ],
    midjourney: [
      "Use descriptive adjectives for style and mood",
      "Include aspect ratio parameters (--ar)",
      "Add quality parameters like --v 6 for latest model",
      "Specify lighting and composition details",
    ],
    dalle: [
      "Be descriptive about visual elements",
      "Specify art style or medium",
      "Include lighting and color preferences",
      "Mention composition and perspective",
    ],
    claude: [
      "Provide clear context and background",
      "Use structured prompts with sections",
      "Be explicit about reasoning requirements",
      "Specify output format preferences",
    ],
    gemini: [
      "Use clear, conversational language",
      "Break complex tasks into steps",
      "Provide relevant context",
      "Specify the type of response needed",
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Wand2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Prompt Optimizer
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your prompts into powerful instructions that get better results from ChatGPT, MidJourney, DALL·E,
            and other AI tools.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Original Prompt
                </CardTitle>
                <CardDescription>
                  Enter your prompt and we'll help you optimize it for better AI results.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter your prompt here... (e.g., 'Write a blog post about sustainable living')"
                  value={originalPrompt}
                  onChange={(e) => setOriginalPrompt(e.target.value)}
                  className="min-h-32 resize-none"
                />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">AI Tool</label>
                    <Select value={options.aiTool} onValueChange={(value) => setOptions({ ...options, aiTool: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {aiToolOptions.map((tool) => (
                          <SelectItem key={tool.value} value={tool.value}>
                            <span className="flex items-center gap-2">
                              <span>{tool.icon}</span>
                              {tool.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tone</label>
                    <Select value={options.tone} onValueChange={(value) => setOptions({ ...options, tone: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {toneOptions.map((tone) => (
                          <SelectItem key={tone.value} value={tone.value}>
                            {tone.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Style</label>
                    <Select value={options.style} onValueChange={(value) => setOptions({ ...options, style: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {styleOptions.map((style) => (
                          <SelectItem key={style.value} value={style.value}>
                            {style.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Length</label>
                    <Select value={options.length} onValueChange={(value) => setOptions({ ...options, length: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {lengthOptions.map((length) => (
                          <SelectItem key={length.value} value={length.value}>
                            {length.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={optimizePrompt}
                  disabled={isOptimizing || !originalPrompt.trim()}
                  className="w-full"
                  size="lg"
                >
                  {isOptimizing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Optimize Prompt
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Optimized Results */}
            {optimizedPrompts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-green-600" />
                    Optimized Prompts
                  </CardTitle>
                  <CardDescription>
                    Here are {optimizedPrompts.length} optimized versions of your prompt. Click to copy any version.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {optimizedPrompts.map((prompt, index) => (
                    <div key={index} className="relative group">
                      <div className="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-lg border">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">Version {index + 1}</Badge>
                          </div>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{prompt}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(prompt)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Tips and Guidelines */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  Tips for {aiToolOptions.find((tool) => tool.value === options.aiTool)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tips[options.aiTool as keyof typeof tips]?.map((tip, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prompt Structure Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="text" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="text">Text AI</TabsTrigger>
                    <TabsTrigger value="image">Image AI</TabsTrigger>
                  </TabsList>
                  <TabsContent value="text" className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="font-medium">Good Structure:</div>
                      <div className="bg-green-50 p-3 rounded text-xs">
                        <strong>Role:</strong> You are an expert...
                        <br />
                        <strong>Task:</strong> Please help me...
                        <br />
                        <strong>Context:</strong> The situation is...
                        <br />
                        <strong>Format:</strong> Provide the answer as...
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="image" className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="font-medium">Good Structure:</div>
                      <div className="bg-blue-50 p-3 rounded text-xs">
                        <strong>Subject:</strong> A detailed description...
                        <br />
                        <strong>Style:</strong> Digital art, photography...
                        <br />
                        <strong>Details:</strong> Lighting, colors, mood...
                        <br />
                        <strong>Parameters:</strong> --ar 16:9 --v 6
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-3 bg-transparent"
                    onClick={() => setOriginalPrompt("Write a blog post about sustainable living")}
                  >
                    <div className="text-xs">
                      <div className="font-medium">Blog Writing</div>
                      <div className="text-gray-500">Write a blog post about sustainable living</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-3 bg-transparent"
                    onClick={() => setOriginalPrompt("A futuristic city at sunset")}
                  >
                    <div className="text-xs">
                      <div className="font-medium">Image Generation</div>
                      <div className="text-gray-500">A futuristic city at sunset</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-3 bg-transparent"
                    onClick={() => setOriginalPrompt("Explain quantum computing")}
                  >
                    <div className="text-xs">
                      <div className="font-medium">Educational</div>
                      <div className="text-gray-500">Explain quantum computing</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
