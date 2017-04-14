/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace Registration {
    import UserJob = User.UserJob;

    /**
     * hold enrollment data for each term
     */
    export class Enrollment extends UserJob {
        major : Department;

        minor : Department;

        year : number;

        semester : Semester;

        /**
         * fetch enrollment by the following
         * 
         * @param userID
         * @param year
         * @param semester
         * @return enrollment or null if not registered
         */
        public static readEnrollment(userID : number, year : number, semester : Semester) : Enrollment {
            return null;
        }

        /**
         * fetch all the enrollment related to this user
         * 
         * @param userID the user id to be used in the search query
         * @return array of enrollment or null if new student
         */
        public static readAllEnrollment(userID : number) : Enrollment {
            return null;
        }

        constructor() {
            super();
            this.year = 0;
        }
    }
    Enrollment["__class"] = "Registration.Enrollment";

}

