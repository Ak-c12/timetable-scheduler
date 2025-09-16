import React, { useState, useEffect } from "react";
import { ApiCourses}  from "../../Api/ApiCalls";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  BookOpen, 
  Search, 
  ChevronRight, 
  User, 
  Calendar, 
  Building2 
} from "lucide-react";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Selection state
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showCourses, setShowCourses] = useState(false);

  // Available options
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const semesters = ["1st Semester", "2nd Semester"];
  const departments = [
    "Computer Science",
    "Information Technology",
    "Electronics",
    "Mechanical",
    "Civil",
    "Electrical",
  ];

  useEffect(() => {
    if (showCourses) {
      loadCourses();
    }
  }, [showCourses, selectedYear, selectedSemester, selectedDepartment]);

  const loadCourses = async () => {
    setIsLoading(true);
    try {
      const params = {
        year: selectedYear,
        semester: selectedSemester,
        department: selectedDepartment,
      };

      // ✅ aligned with backend: GET /admin/courses?year=&semester=&department=
      const data = await Course.list(params);
      setCourses(data);
    } catch (error) {
      console.error("Error loading courses:", error);
      setCourses([]);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (courseData) => {
    const enrichedCourseData = {
      ...courseData,
      year: selectedYear,
      semester: selectedSemester,
      department: selectedDepartment,
    };

    try {
      if (editingCourse) {
        // ✅ aligned with backend: PUT /admin/courses/:id
        await Course.update(editingCourse.id, enrichedCourseData);
      } else {
        // ✅ aligned with backend: POST /admin/courses
        await Course.create(enrichedCourseData);
      }
      setShowForm(false);
      setEditingCourse(null);
      loadCourses();
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleProceed = () => {
    if (selectedYear && selectedSemester && selectedDepartment) {
      setShowCourses(true);
    }
  };

  const handleReset = () => {
    setSelectedYear("");
    setSelectedSemester("");
    setSelectedDepartment("");
    setShowCourses(false);
    setCourses([]);
    setShowForm(false);
    setEditingCourse(null);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.faculty_name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // -----------------------------------
  // Selection Screen
  // -----------------------------------
  if (!showCourses) {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Course Management
            </h1>
            <p className="text-gray-600">
              Select year, semester, and department to manage courses
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-gray-800">
                Course Selection Criteria
              </CardTitle>
              <p className="text-gray-600">
                Please select all three criteria to proceed
              </p>
            </CardHeader>
            <CardContent className="space-y-8 p-8">
              {/* Year Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <label className="text-lg font-semibold text-gray-700">
                    Academic Year
                  </label>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {years.map((year) => (
                    <Button
                      key={year}
                      variant={selectedYear === year ? "default" : "outline"}
                      onClick={() => setSelectedYear(year)}
                      className={`h-12 ${
                        selectedYear === year
                          ? "bg-blue-600 hover:bg-blue-700 shadow-lg"
                          : "hover:bg-blue-50 hover:border-blue-300"
                      }`}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Semester Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  <label className="text-lg font-semibold text-gray-700">
                    Semester
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {semesters.map((semester) => (
                    <Button
                      key={semester}
                      variant={
                        selectedSemester === semester ? "default" : "outline"
                      }
                      onClick={() => setSelectedSemester(semester)}
                      className={`h-12 ${
                        selectedSemester === semester
                          ? "bg-green-600 hover:bg-green-700 shadow-lg"
                          : "hover:bg-green-50 hover:border-green-300"
                      }`}
                    >
                      {semester}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Department Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5 text-purple-600" />
                  <label className="text-lg font-semibold text-gray-700">
                    Department
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {departments.map((dept) => (
                    <Button
                      key={dept}
                      variant={
                        selectedDepartment === dept ? "default" : "outline"
                      }
                      onClick={() => setSelectedDepartment(dept)}
                      className={`h-12 ${
                        selectedDepartment === dept
                          ? "bg-purple-600 hover:bg-purple-700 shadow-lg"
                          : "hover:bg-purple-50 hover:border-purple-300"
                      }`}
                    >
                      {dept}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Proceed Button */}
              <div className="pt-6 text-center">
                <Button
                  onClick={handleProceed}
                  disabled={
                    !selectedYear || !selectedSemester || !selectedDepartment
                  }
                  className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Proceed to Courses
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // -----------------------------------
  // Main Courses Screen
  // -----------------------------------
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Selection Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button
                onClick={handleReset}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                ← Change Selection
              </Button>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Course Management
            </h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Calendar className="w-3 h-3 mr-1" />
                {selectedYear}
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <BookOpen className="w-3 h-3 mr-1" />
                {selectedSemester}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800"
              >
                <Building2 className="w-3 h-3 mr-1" />
                {selectedDepartment}
              </Badge>
            </div>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            Add New Course
          </Button>
        </div>

        {/* Search */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses by name, code, or faculty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Course Form */}
        {showForm && (
          <EnhancedCourseForm
            course={editingCourse}
            selectedYear={selectedYear}
            selectedSemester={selectedSemester}
            selectedDepartment={selectedDepartment}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingCourse(null);
            }}
          />
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(6)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : filteredCourses.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No courses found
              </h3>
              <p className="text-gray-500">
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "Add your first course for this selection"}
              </p>
            </div>
          ) : (
            filteredCourses.map((course) => (
              <EnhancedCourseCard
                key={course.id}
                course={course}
                onEdit={handleEdit}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// -----------------------------------
// Enhanced Course Form Component
// -----------------------------------
function EnhancedCourseForm({
  course,
  selectedYear,
  selectedSemester,
  selectedDepartment,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    name: course?.name || "",
    code: course?.code || "",
    credits: course?.credits || "",
    description: course?.description || "",
    faculty_id: course?.faculty_id || "",
    faculty_name: course?.faculty_name || "",
    faculty_email: course?.faculty_email || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      formData.name &&
      formData.code &&
      formData.credits &&
      formData.faculty_name
    ) {
      onSubmit(formData);
    }
  };

  return (
    <Card className="shadow-xl border-0 bg-white">
      <CardHeader>
        <CardTitle className="text-2xl">
          {course ? "Edit Course" : "Add New Course"}
        </CardTitle>
        <div className="flex gap-2">
          <Badge variant="outline">{selectedYear}</Badge>
          <Badge variant="outline">{selectedSemester}</Badge>
          <Badge variant="outline">{selectedDepartment}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Course Name *
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Data Structures and Algorithms"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Course Code *
              </label>
              <Input
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g., CS201"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Credits *</label>
            <Input
              name="credits"
              type="number"
              value={formData.credits}
              onChange={handleChange}
              placeholder="e.g., 3"
              min="1"
              max="6"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none"
              rows="3"
              placeholder="Brief description of the course..."
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Faculty Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Faculty ID
                </label>
                <Input
                  name="faculty_id"
                  value={formData.faculty_id}
                  onChange={handleChange}
                  placeholder="e.g., FAC001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Faculty Name *
                </label>
                <Input
                  name="faculty_name"
                  value={formData.faculty_name}
                  onChange={handleChange}
                  placeholder="e.g., Dr. John Smith"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Faculty Email
                </label>
                <Input
                  name="faculty_email"
                  type="email"
                  value={formData.faculty_email}
                  onChange={handleChange}
                  placeholder="e.g., john.smith@college.edu"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {course ? "Update Course" : "Add Course"}
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// -----------------------------------
// Enhanced Course Card Component
// -----------------------------------
function EnhancedCourseCard({ course, onEdit }) {
  return (
    <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-gray-800 mb-1">
              {course.name}
            </CardTitle>
            <div className="flex gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {course.code}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {course.credits} Credits
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {course.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {course.description}
          </p>
        )}

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-gray-500" />
            <div>
              <span className="font-medium">{course.faculty_name}</span>
              {course.faculty_id && (
                <span className="text-gray-500 ml-2">
                  ({course.faculty_id})
                </span>
              )}
            </div>
          </div>
          {course.faculty_email && (
            <div className="text-xs text-gray-500 ml-6">
              {course.faculty_email}
            </div>
          )}
        </div>

        <Button
          onClick={() => onEdit(course)}
          variant="outline"
          size="sm"
          className="w-full hover:bg-blue-50 hover:border-blue-300"
        >
          Edit Course
        </Button>
      </CardContent>
    </Card>
  );
}